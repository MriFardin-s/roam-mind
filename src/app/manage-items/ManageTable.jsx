'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { deleteDestination } from '@/lib/action/destinations';

const ManageItemsTable = ({ initialItems, role }) => {
    const [items, setItems] = useState(initialItems);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setIsAlertOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;

        try {
            setIsDeleting(true);

            const result = await deleteDestination({ id: productToDelete });

            if (result && (result.success || result.ok)) {
                setItems((prev) =>
                    prev.filter((p) => {
                        const id = p._id?.$oid || p._id;
                        return id !== productToDelete;
                    })
                );
                toast.success("Destination deleted successfully");
                setIsAlertOpen(false);
            } else {
                toast.error(result?.message || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">Image</th>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Category</th>
                        {/* {role === 'admin' && <th className="px-6 py-3">Added By</th>}
                        <th className="px-6 py-3">Status</th> */}
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const itemKey = item._id?.$oid || item._id || `item-${index}`;
                        const rawId = item._id?.$oid || item._id;

                        return (
                            <tr key={itemKey} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-10 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4">{item.location}</td>
                                <td className="px-6 py-4 capitalize">{item.category}</td>
                                {/* {role === 'admin' && (
                                    <td className="px-6 py-4">
                                        <span className="block font-semibold">{item.user?.name}</span>
                                        <span className="text-xs text-gray-400">{item.user?.email}</span>
                                    </td>
                                )} */}
                                {/* <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td> */}
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Link
                                            href={`/explore/${rawId}`}
                                            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(rawId)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={role === 'admin' ? 7 : 6} className="text-center py-8 text-gray-400">
                                No destinations found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isAlertOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 max-w-sm w-full shadow-xl rounded-lg">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">Are you absolutely sure?</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                            This action cannot be undone. This will permanently delete the item from the system.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsAlertOpen(false);
                                    setProductToDelete(null);
                                }}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition disabled:opacity-50 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center min-w-[80px] disabled:opacity-50 rounded"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageItemsTable;