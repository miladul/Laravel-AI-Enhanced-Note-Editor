// resources/js/Components/Sidebar.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url } = usePage();

    const isActive = (href) => url.startsWith(href);

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/dashboard') ? 'bg-gray-700 font-semibold' : ''}`}
                >
                    Dashboard
                </Link>
                <Link
                    href="/ai-editor"
                    className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/ai-editor') ? 'bg-gray-700 font-semibold' : ''}`}
                >
                    AI Text Editor
                </Link>
                <Link
                    href="/profile"
                    className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/profile') ? 'bg-gray-700 font-semibold' : ''}`}
                >
                    Profile
                </Link>
            </nav>
        </aside>
    );
}
