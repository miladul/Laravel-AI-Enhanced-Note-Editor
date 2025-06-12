import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AppLayout from "@/Layouts/AppLayout.jsx";

export default function Edit({mustVerifyEmail, status}) {
    return (
        <AppLayout>
            <div className="p-6">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
