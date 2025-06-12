import React, { useState } from 'react';
import axios from 'axios';

export default function NoteEditor({ note }) {
    const [content, setContent] = useState(note?.content || '');
    const [title, setTitle] = useState(note?.title || '');
    const [summary, setSummary] = useState('');

    const handleSave = () => {
        axios.post('/api/notes/save', { id: note?.id, title, content });
    };

    const handleAI = async () => {
        const res = await axios.post('/api/notes/summarize', { content });
        setSummary(res.data.summary);
    };

    return (
        <div className="p-6">
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-4 p-2 border" placeholder="Note Title" />
            <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-60 p-2 border" />
            <div className="mt-4">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Save</button>
                <button onClick={handleAI} className="bg-purple-500 text-white px-4 py-2 rounded">Summarize with AI</button>
            </div>
            {summary && (
                <div className="mt-4 p-2 border bg-gray-100">
                    <h3 className="font-semibold">AI Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}
