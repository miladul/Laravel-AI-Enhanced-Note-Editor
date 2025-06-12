import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from "@/Components/Pagination.jsx";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: '', content: '' });
    const [saving, setSaving] = useState(false);

    const token = window.ACCESS_TOKEN;
    console.log('token', token)

    // Fetch latest notes from backend API
    const fetchNotes = async (page = 1) => {
        try {
            const response = await axios.get(`/api/notes?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotes(response.data.data);
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page
            });
        } catch (error) {
            toast.error('Failed to fetch notes');
        }
    };

    useEffect(() => {
        fetchNotes(); // fetch page 1 initially
    }, []);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await axios.post('/api/notes', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setNotes(prev => [...prev, response.data.note]);
            setForm({ title: '', content: '' });

            toast.success('Note created successfully'); // ✅ Moved before hiding modal
            setShowModal(false);

            fetchNotes();
        } catch (error) {
            toast.error('Failed to create note');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this note?')) {
            axios.delete(`/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    toast.success('Note deleted successfully');
                    setNotes(notes.filter(note => note.id !== id));
                })
                .catch(() => {
                    toast.error('Failed to delete note');
                });
        }
    };

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">My Notes</h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
                >
                    + New Note
                </button>

                <ul className="space-y-2">
                    {notes.length > 0 ? (
                        notes.map(note => (
                        <li key={note.id} className="flex justify-between items-center border px-3 py-2 rounded">
                            <span className="font-medium text-gray-800">{note.title}</span>
                            <div className="space-x-2">
                                {/* Replace with your actual links */}
                                <a href={`/notes/${note.id}/view`} className="text-blue-500 hover:underline">View</a>
                                <a href={`/notes/${note.id}/edit`} className="text-yellow-500 hover:underline">Edit</a>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No notes found.</li>
                    )}
                </ul>

                {pagination.last_page > 1 && (
                    <Pagination
                        currentPage={pagination.current_page}
                        lastPage={pagination.last_page}
                        onPageChange={fetchNotes}
                    />
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                            <h2 className="text-lg font-bold mb-4">Add New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm({...form, title: e.target.value})}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Content</label>
                                    <textarea
                                        value={form.content}
                                        onChange={e => setForm({...form, content: e.target.value})}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded"
                                        disabled={saving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 text-white rounded ${
                                            saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4 mr-2 inline-block text-white"
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
                                                Saving...
                                            </>
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
