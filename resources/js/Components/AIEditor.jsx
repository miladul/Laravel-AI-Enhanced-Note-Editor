import React, { useState } from 'react';

export default function AIEditor() {
    const [text, setText] = useState('');
    const [aiResponse, setAIResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const openai_api_key = window.OPENAI_API_KEY;

    const askAI = async (type) => {
        setLoading(true);
        setAIResponse('AI: ...');

        let prompt = '';
        switch (type) {
            case 'summarize':
                prompt = `Summarize this: ${text}`;
                break;
            case 'improve':
                prompt = `Improve this writing: ${text}`;
                break;
            case 'tags':
                prompt = `Generate relevant tags for this text: ${text}`;
                break;
            default:
                return;
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openai_api_key}`, // Replace this with your real key or securely store it in .env
            },
            body: JSON.stringify({
                model: "gpt-4.1-nano-2025-04-14",
                messages: [{ role: "user", content: prompt }],
                stream: true,
            }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = '';
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunk = decoder.decode(value, { stream: true });

            const lines = chunk.split("\n").filter(line => line.startsWith("data:"));
            for (const line of lines) {
                const json = line.replace(/^data:\s*/, "");
                if (json === "[DONE]") {
                    done = true;
                    break;
                }
                try {
                    const parsed = JSON.parse(json);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                        result += content;
                        setAIResponse('AI: ' + result);
                    }
                } catch (err) {
                    console.error("Error parsing:", err);
                }
            }
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">AI-Powered Text Editor</h2>
            <textarea
                className="w-full border p-3 h-48 rounded-md focus:outline-none focus:ring"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write something..."
            />

            <div className="mt-4 space-x-2">
                <button
                    onClick={() => askAI('summarize')}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Summarize
                </button>
                <button
                    onClick={() => askAI('improve')}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    Improve
                </button>
                <button
                    onClick={() => askAI('tags')}
                    disabled={loading}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                >
                    Generate Tags
                </button>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded min-h-[80px] whitespace-pre-wrap">
                {aiResponse || <em>AI response will appear here...</em>}
            </div>
        </div>
    );
}
