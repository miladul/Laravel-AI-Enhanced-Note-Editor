/*
import React from 'react';

export default function Home() {
    return (
        <div style={{ padding: 50 }}>
            <h1>Hello from Home Page</h1>
        </div>
    );
}
*/


import React, { useState } from 'react';

export default function Home() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: handle normal login logic here (e.g., Inertia.post('/login', form))
        console.log(form);
    };

    const handleGoogleLogin = () => {
        // TODO: redirect to Google login route (e.g., /auth/google)
        window.location.href = '/auth/google';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="my-4 text-center text-gray-500">or</div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
}

