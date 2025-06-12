import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdatePasswordForm({ className = '' }) {
    const [data, setData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await axios.put('/password', data);
            toast.success('Password updated successfully!');
            setData({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
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
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <TextInput
                        id="current_password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.current_password}
                        onChange={(e) => setData({ ...data, current_password: e.target.value })}
                        required
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData({ ...data, password_confirmation: e.target.value })
                        }
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
