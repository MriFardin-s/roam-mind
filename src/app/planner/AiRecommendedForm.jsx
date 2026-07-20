'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const AiRecommendedForm = ({ categories = [], initialRecommendations = null, serverError = '' }) => {
    const searchParams = useSearchParams();

    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [region, setRegion] = useState(searchParams.get('region') || '');

    const getFilterLink = () => {
        if (!category || !region) return '#';
        return `/planner?category=${category}&region=${region}`;
    };

    const isLinkDisabled = !category || !region;

    return (
        <>
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm max-w-3xl mx-auto mb-12">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Travel Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring outline-none transition"
                            >
                                <option value="">Select Category...</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Region Preference</label>
                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="w-full bg-input border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-ring outline-none transition"
                            >
                                <option value="">Select Region...</option>
                                <option value="domestic">Domestic</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                    </div>

                    {serverError && <p className="text-destructive text-red-600 text-sm text-center font-medium">{serverError}</p>}

                    <Link
                        href={getFilterLink()}
                        onClick={(e) => isLinkDisabled && e.preventDefault()}
                        className={`block text-center w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg transition hover:opacity-90 ${
                            isLinkDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                        }`}
                    >
                        Apply Filters ✨
                    </Link>
                </div>
            </div>

            {initialRecommendations && (
                <div className="space-y-8">
                    <div className="bg-secondary p-6 rounded-lg border border-border">
                        <h3 className="text-xl font-bold text-secondary-foreground mb-2">🤖 AI Analysis:</h3>
                        <p className="text-muted-foreground italic">{initialRecommendations.reasoning}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {initialRecommendations.data?.map((destination) => (
                            <div key={destination._id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                                <img src={destination.image || '/placeholder.jpg'} alt={destination.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <h4 className="text-xl font-bold mb-2">{destination.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3">📍 {destination.location}</p>
                                    <p className="text-sm line-clamp-3 mb-4">{destination.shortDescription}</p>
                                    <div className="flex justify-between text-xs text-primary font-medium">
                                        <span className="capitalize">{destination.category}</span>
                                        <span className="text-muted-foreground capitalize">{destination.region}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AiRecommendedForm;