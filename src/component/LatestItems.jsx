import { getLatestItems } from '@/lib/api/destinations';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const LatestItems = async () => {
    const response = await getLatestItems();
    const items = response?.data || [];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-10">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                    Curated Catalogs
                </span>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                    Latest Wonder Entries
                </h2>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-12 text-sm text-muted-foreground font-medium border border-dashed border-border rounded-2xl">
                    No latest destinations found.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => {
                            const itemId = item._id?.toString() || item._id;

                            const formattedDate = item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                                : 'Recent';

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
                                                </p>
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

                    {/* View All Link Section */}
                    <div className="mt-12 flex justify-center">
                        <Link href="/explore">
                            <button className="w-fit flex items-center justify-center gap-2 px-6 py-4 bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer group">
                                View All Destinations
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default LatestItems;