import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AddDestinationForm from './AddDestinationForm';

const AddItems = async () => {
    const user = await getUserSession()
    if (!user){
        redirect("/auth/signin");
    }
    return (
        <div>
            <AddDestinationForm/>
        </div>
    );
};

export default AddItems;