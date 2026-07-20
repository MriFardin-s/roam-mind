import { getDestinationsById } from '@/lib/api/destinations';
import Image from 'next/image';
import Link from 'next/link';

import { notFound } from 'next/navigation';



export default async function DetailsPage({ params }) {
    const { id } = await params;
    const response = await getDestinationsById(id);

    if (!response?.success || !response?.data) {
        notFound();
    }

    const destination = response.data;
    const relatedItems = response.relatedItems || [];

    return (
        <div className="min-h-screen bg-base-100 text-base-content pb-20">
            {/* Hero Section */}
            <div className="relative h-[65vh] w-full overflow-hidden">
                <img
                    src={destination.image || "/placeholder.jpg"}
                    alt={destination.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent"></div>

                <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full uppercase tracking-wider">
                            {destination.category || "Exploration"}
                        </span>
                        {destination.rating && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-base-100/80 backdrop-blur-md text-warning text-xs font-bold rounded-full border border-base-content/10">
                                ★ {destination.rating}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground/80 tracking-tight mb-2">
                        {destination.title}
                    </h1>

                    <p className="flex items-center gap-2 text-primary-foreground/80 text-sm md:text-base font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {destination.location || "Location not specified"}
                    </p>
                </div>
            </div>

            {/* Main Content & Sidebar */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">

                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-base-200/50 backdrop-blur-md border border-base-content/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                        <h2 className="text-2xl font-bold tracking-tight text-base-content">
                            About this Destination
                        </h2>
                        <p className="text-base-content/80 text-base leading-relaxed whitespace-pre-line">
                            {destination.
                                longDescription || "No detailed description available for this destination."}
                        </p>
                    </div>

                    {/* Quick Highlights / Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-base-200/40 rounded-2xl border border-base-content/5">
                            <span className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Category</span>
                            <p className="font-bold text-base mt-1 capitalize">{destination.category || "N/A"}</p>
                        </div>
                        <div className="p-4 bg-base-200/40 rounded-2xl border border-base-content/5">
                            <span className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Best Time</span>
                            <p className="font-bold text-base mt-1">{destination.bestTime || "All Year"}</p>
                        </div>
                        <div className="p-4 bg-base-200/40 rounded-2xl border border-base-content/5">
                            <span className="text-xs text-base-content/50 uppercase font-semibold tracking-wider">Avg Cost</span>
                            <p className="font-bold text-base mt-1">{destination.price ? `$${destination.price}` : "Flexible"}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Booking Action & Related Items */}
                <div className="space-y-8">
                    {/* Booking / Action Card */}
                    <div className="bg-gradient-to-b from-base-200 to-base-100 border border-base-content/10 rounded-3xl p-6 shadow-xl  ">
                   

                        <button className="hover:bg-primary-focus text-primary-content shadow-lg  active:scale-95 flex items-center justify-center gap-2 w-full py-3 bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center">
                            <span>Plan Trip Here</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                        <div className="text-xs text-center text-base-content/60 mt-4">
                            Need customized itineraries?{" "}
                            <Link
                                href="/explore-ai"
                                className="text-blue-600 hover:text-blue-500 font-semibold underline decoration-blue-400 decoration-dashed underline-offset-4 transition-colors duration-200"
                            >
                                Use our AI Travel Assistant!
                            </Link>
                        </div>
                    </div>

                    {/* Related Destinations */}
                    {relatedItems.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-base-content/90 px-1">
                                Similar Spots You Might Like
                            </h3>
                            <div className="space-y-3">
                                {relatedItems.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/explore/${item._id}`}
                                        className="flex items-center gap-4 p-3 bg-base-200/40 hover:bg-base-200 rounded-2xl border border-base-content/5 transition-all duration-200 group"
                                    >
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                            <img
                                                src={item.image || "/placeholder.jpg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-base-content truncate group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-base-content/60 truncate mt-0.5">
                                                {item.location}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}