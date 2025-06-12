import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppLayout from '@/Layouts/AppLayout';

const token = window.ACCESS_TOKEN;

export default function EditNote({ note }) {
    const { data, setData, processing } = useForm({
        title: note.title,
        content: note.content,
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`/api/notes/${note.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Note updated successfully!');
            setTimeout(() => {
                router.get('/dashboard');
            }, 1500);
        } catch (error) {
            toast.error('Failed to update note.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="p-6 max-w-xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Edit Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Content</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            rows={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 rounded text-white flex items-center justify-center gap-2 ${
                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            'Update Note'
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
