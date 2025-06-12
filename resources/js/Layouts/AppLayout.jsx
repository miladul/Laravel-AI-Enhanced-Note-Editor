/*import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({ children }) {
    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <main>{children}</main>
        </>
    );
}*/

import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

