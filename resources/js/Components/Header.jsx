// resources/js/Components/Header.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const avatar = window.avatar;

    console.log('avatar', avatar)

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>

            <div className="relative">
                <img
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    src={avatar} // Replace with user profile photo
                    alt="Profile"
                    className="h-10 w-10 rounded-full cursor-pointer"
                />

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
