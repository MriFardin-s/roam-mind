import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AddDestinationForm from './AddDestinationForm';
import { redirect } from 'next/navigation';

const AddItems = async () => {
    const user = await getUserSession()
    if (!user?.email || !user?.role) {
        redirect("/auth/signin");
    }
    return (
        <div>
            <AddDestinationForm />
        </div>
    );
};

export default AddItems;