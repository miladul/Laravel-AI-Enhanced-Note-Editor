import React from 'react';
import AIEditor from '@/Components/AIEditor';
import AppLayout from "@/Layouts/AppLayout.jsx";

export default function AIEditorPage() {
    return (
        <AppLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <AIEditor/>
            </div>
        </AppLayout>

    );
}
