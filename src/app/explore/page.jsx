import React from 'react';
import { getDestinations } from '@/lib/api/destinations'; 
import ExploreDestinationsClient from './ExploreDestinationsClient';


const ExplorePage = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params.search || "";
    const category = params.category || "";
    const region = params.region || "";
    const sort = params.sort || "newest";
    const page = params.page || "1";

    const res = await getDestinations({ search, category, region, sort, page }) || {};
    
    const serverData = {
        destinations: res?.data || [],
        totalItems: res?.totalItems || 0,
        totalPages: res?.totalPages || 1
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="relative mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/60 pb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Inspiration for travel
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mt-3">
                            Wonder <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Catalogs</span>
                        </h1>
                    </div>
                    <p className="max-w-md text-muted-foreground text-sm md:text-base font-medium leading-relaxed">
                        A curated collection of untamed destinations, localized experiences, and architectural marvels.
                    </p>
                </div>

                <ExploreDestinationsClient
                    serverData={serverData}
                    activeFilters={{ search, category, region, sort, page: Number(page) }}
                />
            </div>
        </div>
    );
};

export default ExplorePage;