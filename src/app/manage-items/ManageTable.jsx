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
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {items.map((item, index) => {
                    const rawId = item._id?.$oid || item._id;
                    const itemKey = rawId || `card-${index}`;

                    return (
                        <div key={itemKey} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.title}</h4>
                                    <span className="text-xs text-gray-500 mt-1">📍 {item.location}</span>
                                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit mt-2 capitalize">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-gray-100">
                                <Link
                                    href={`/explore/${rawId}`}
                                    className="flex-1 text-center py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                >
                                    View
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(rawId)}
                                    className="flex-1 text-center py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}

                {items.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400 bg-white rounded-xl border border-gray-200">
                        No destinations found.
                    </div>
                )}
            </div>

            <div className="hidden md:block overflow-x-auto shadow-sm rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 lg:px-6 py-4">Image</th>
                            <th className="px-4 lg:px-6 py-4">Title</th>
                            <th className="px-4 lg:px-6 py-4">Location</th>
                            <th className="px-4 lg:px-6 py-4">Category</th>
                            <th className="px-4 lg:px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item, index) => {
                            const rawId = item._id?.$oid || item._id;
                            const itemKey = rawId || `item-${index}`;

                            return (
                                <tr key={itemKey} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-4 lg:px-6 py-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-14 h-10 lg:w-16 lg:h-10 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900">{item.title}</td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">{item.location}</td>
                                    <td className="px-4 lg:px-6 py-4 capitalize whitespace-nowrap">{item.category}</td>
                                    <td className="px-4 lg:px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 lg:gap-3">
                                            <Link
                                                href={`/explore/${rawId}`}
                                                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition shadow-sm"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(rawId)}
                                                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition shadow-sm"
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
                                <td colSpan={5} className="text-center py-10 text-gray-400">
                                    No destinations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isAlertOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 max-w-sm w-full shadow-2xl rounded-2xl">
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">Are you absolutely sure?</h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                            This action cannot be undone. This will permanently delete the item from the system.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsAlertOpen(false);
                                    setProductToDelete(null);
                                }}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition disabled:opacity-50 rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center min-w-[80px] disabled:opacity-50 rounded-lg cursor-pointer"
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