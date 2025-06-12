import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function ViewNote({ note }) {
    return (
        <AppLayout>
            <div className="p-6 max-w-xl mx-auto">
                <h2 className="text-xl font-bold mb-4">View Note</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Title</label>
                    <p className="border px-3 py-2 rounded bg-gray-100">{note.title}</p>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Content</label>
                    <div className="border px-3 py-2 rounded bg-gray-100 whitespace-pre-wrap">
                        {note.content}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
