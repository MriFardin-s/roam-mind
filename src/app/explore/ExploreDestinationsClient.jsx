"use client";

import React, { useTransition, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from 'next/link';

export default function ExploreDestinationsClient({ serverData, activeFilters }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const itemsPerPage = 12;
    const { destinations = [], totalItems = 0, totalPages = 1 } = serverData;


    const currentPage = Number(activeFilters.page) || 1;


    const [searchTerm, setSearchTerm] = useState(activeFilters.search || "");


    const isFirstRender = useRef(true);


    useEffect(() => {
        setSearchTerm(activeFilters.search || "");
    }, [activeFilters.search]);


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (searchTerm === (activeFilters.search || "")) return;

        const delayDebounceFn = setTimeout(() => {
            syncParams({ search: searchTerm, page: 1 });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, activeFilters.search]);

    const syncParams = (updates) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });


        if (!updates.hasOwnProperty("page")) {
            params.set("page", "1");
        }

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        startTransition(() => {
            router.push(url, { scroll: false });
        });
    };

    const clearAllFilters = () => {
        setSearchTerm("");
        startTransition(() => {
            router.push(pathname);
        });
    };

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        if (totalPages <= 1) return [1];
        const pages = [];
        const siblingCount = 1;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);
        if (currentPage > 3) pages.push("ellipsis");

        const start = Math.max(2, currentPage - siblingCount);
        const end = Math.min(totalPages - 1, currentPage + siblingCount);

        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("ellipsis");
        pages.push(totalPages);
        return pages;
    };

    return (
        <div className="space-y-8">


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm items-end">
                <div className="lg:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Search Destination</label>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Category Type</label>
                    <select
                        value={activeFilters.category || ""}
                        onChange={(e) => syncParams({ category: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
                    >
                        <option value="">All Categories</option>
                        <option value="nature">Nature</option>
                        <option value="adventure">Adventure</option>
                        <option value="beach">Beach</option>
                        <option value="cultural">Cultural</option>
                    </select>
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Region</label>
                    <select
                        value={activeFilters.region || ""}
                        onChange={(e) => syncParams({ region: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
                    >
                        <option value="">All Regions</option>
                        <option value="domestic">Local</option>
                        <option value="international">International</option>
                    </select>
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">Sort By</label>
                    <select
                        value={activeFilters.sort || "newest"}
                        onChange={(e) => syncParams({ sort: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
                    >
                        <option value="newest">Newest Added</option>
                        <option value="rating-high">Rating: High to Low</option>
                        <option value="rating-low">Rating: Low to High</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <button
                    onClick={clearAllFilters}
                    className="h-[38px] w-full rounded-xl border border-border hover:bg-muted flex items-center justify-center text-xs uppercase tracking-widest font-bold text-muted-foreground transition cursor-pointer"
                >
                    Reset Filters
                </button>
            </div>

            <div className={`transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}>

                {destinations.length === 0 ? (
                    <div className="text-center py-24 bg-card/50 backdrop-blur-md rounded-3xl border border-dashed border-border flex flex-col items-center justify-center">
                        <div className="text-4xl mb-3">🗺️</div>
                        <p className="text-muted-foreground font-medium">No unique paths matches your query filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {destinations.map((item) => {
                            const itemId = item._id?.$oid || item._id || item.id;
                            const rawDate = item.createdAt?.$date || item.createdAt;
                            const formattedDate = rawDate
                                ? new Date(rawDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : "Recent";

                            return (
                                <div
                                    key={itemId}
                                    className="group w-full h-[470px] bg-card text-card-foreground rounded-[24px] border border-border/80 overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col hover:-translate-y-1.5 shadow-sm"
                                >
                                    <div className="relative h-52 w-full overflow-hidden bg-muted flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                                            <span className="text-[9px] uppercase tracking-wider font-black text-background bg-foreground px-2 py-1 rounded-md shadow-sm">
                                                {item.category}
                                            </span>
                                            <span className="text-[9px] uppercase tracking-wider font-black text-foreground bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                                                {item.region}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow justify-between overflow-hidden relative">
                                        <div className="flex flex-col gap-2 overflow-hidden">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-semibold text-primary/80 flex items-center gap-1 truncate">
                                                    <span>📍</span> {item.location}
                                                </                p>
                                                <div className="text-xs font-bold text-foreground flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-lg border border-border/40 flex-shrink-0">
                                                    ★ {Number(item.rating || 0).toFixed(1)}
                                                </div>
                                            </div>

                                            <h3 className="font-extrabold text-xl leading-snug text-foreground tracking-tight line-clamp-1 mt-1">
                                                {item.title}
                                            </h3>

                                            <p className="text-xs leading-relaxed text-muted-foreground/90 line-clamp-3 mt-2 font-medium break-words">
                                                {item.shortDescription}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-auto flex flex-col gap-3 flex-shrink-0">
                                            <div className="flex items-center justify-between text-[10px] text-muted-foreground/80 font-medium bg-muted/40 px-3 py-1.5 rounded-xl border border-border/30">
                                                <span className="truncate">By @{item.user?.name || "wanderer"}</span>
                                                <span className="flex-shrink-0">{formattedDate}</span>
                                            </div>
                                            <Link href={`/explore/${itemId}`} className="w-full">
                                                <button className="w-full py-3 bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {totalPages >= 1 && (
                    <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{startItem}-{endItem}</span> of <span className="font-semibold text-foreground">{totalItems}</span> destinations
                        </p>

                        <div className="flex items-center gap-1 bg-card p-1.5 rounded-xl border border-border shadow-sm">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => syncParams({ page: Math.max(1, currentPage - 1) })}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-xs">...</span>
                                ) : (
                                    <button
                                        key={`page-${p}`}
                                        onClick={() => syncParams({ page: p })}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${p === currentPage
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => syncParams({ page: Math.min(totalPages, currentPage + 1) })}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}