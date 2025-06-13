import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [data, setData] = useState({
        user_id: window.authUserId,
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            //await axios.put('/profile', data);
            await axios.post('/profile_update.php', data);
            toast.success('Profile updated successfully by Raw PHP!');
            setData((prev) => ({
                ...prev,
                password: '',
                password_confirmation: '',
            }));
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error('Something went wrong.');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* New Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        autoComplete="new-password"
                        placeholder="Leave blank to keep current password"
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                        autoComplete="new-password"
                        placeholder="Leave blank to keep current password"
                    />
                    <InputError className="mt-2" message={errors.password_confirmation} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <button
                                type="button"
                                onClick={() => axios.post(route('verification.send'))}
                                className="ml-1 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </button>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
