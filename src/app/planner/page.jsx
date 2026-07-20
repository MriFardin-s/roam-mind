import { getAIRecommendations } from '@/lib/action/destinations';
import React from 'react';
import AiRecommendedForm from './AiRecommendedForm';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const AiRecommendedPage = async ({ searchParams }) => {

    const user = await getUserSession()
    if (!user?.email || !user?.role) {
        redirect("/auth/signin");
    }
    const resolvedSearchParams = await searchParams;
    const categoryQuery = resolvedSearchParams?.category;
    const regionQuery = resolvedSearchParams?.region;

    const travelCategories = [
        { value: 'adventure', label: 'Adventure' },
        { value: 'beach', label: 'Beach' },
        { value: 'culture', label: 'Culture' },
        { value: 'nature', label: 'Nature' },
    ];

    let initialRecommendations = null;
    let initialError = '';

    if (categoryQuery && regionQuery) {
        const requestData = {
            currentCategory: categoryQuery,
            preferredRegion: regionQuery,
        };

        try {
            const response = await getAIRecommendations(requestData);

            if (response.success) {
                initialRecommendations = response;
            } else {
                initialError = response.message || "Something went wrong!";
            }

        } catch (err) {
            initialError =
                err.response?.data?.message ||
                err.message ||
                "AI recommendations are temporarily unavailable because the daily AI quota has been reached. Please try again tomorrow.";
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                        Roam Mind Catalogs AI Intelligence
                    </h1>
                </div>

                <AiRecommendedForm
                    categories={travelCategories}
                    initialRecommendations={initialRecommendations}
                    serverError={initialError}
                />
            </div>
        </div>
    );
};

export default AiRecommendedPage;