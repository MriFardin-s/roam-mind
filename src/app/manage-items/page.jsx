import { getUserSession } from '@/lib/core/session';
import { getManageItems } from '@/lib/api/destinations'; 
import { redirect } from 'next/navigation';
import React from 'react';
import ManageItemsTable from './ManageTable';


const ManageItemsPage = async () => {
    const user = await getUserSession();
    // console.log(user)
    if (!user?.email || !user?.role) {
        redirect("/auth/signin");
    }

    let items = [];
    let errorMessage = null;

    try {
        items = await getManageItems(user.email, user.role);
    } catch (error) {
        errorMessage = error.message;
    }

    if (errorMessage) {
        return (
            <div className="container mx-auto p-6 text-center">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                {user.role === 'admin' ? 'All Destinations' : 'My Destinations'}
            </h1>
            <ManageItemsTable initialItems={items} role={user.role} />
        </div>
    );
};

export default ManageItemsPage;