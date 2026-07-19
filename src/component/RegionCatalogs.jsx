

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import { getRegionStats } from '@/lib/api/destinations';

const RegionCatalogs = async () => {
    const response = await getRegionStats();
    const stats = response?.data || { domestic: 0, international: 0 };

    const regions = [
        {
            id: "domestic",
            title: "Domestic Wonders",
            description: "Explore the breathtaking landscapes and hidden treasures right within the homeland borders.",
            count: stats.domestic,
            query: "domestic",
            icon: <MapPin className="w-5 h-5 text-primary" />,
            bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "international",
            title: "International Escapes",
            description: "Cross the oceans and discover majestic ancient architecture and dramatic foreign coastlines.",
            count: stats.international,
            query: "international",
            icon: <Globe className="w-5 h-5 text-primary" />,
            bg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-10">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                    Territory Catalogs
                </span>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                    Browse By Boundless Regions
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regions.map((region) => (
                    <div
                        key={region.id}
                        className="group w-full h-[400px] bg-card text-card-foreground rounded-[24px] border border-border/80 overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col hover:-translate-y-1.5 shadow-sm relative"
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src={region.bg}
                                alt={region.title}
                                className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                        </div>

                        <div className="p-8 flex flex-col h-full justify-between relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-secondary rounded-xl border border-border/40">
                                        {region.icon}
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase bg-primary/10 text-primary px-3 py-1 rounded-md border border-primary/20">
                                        {region.count} Destinations
                                    </span>
                                </div>

                                <h3 className="font-extrabold text-2xl tracking-tight text-foreground mt-2">
                                    {region.title}
                                </h3>

                                <p className="text-xs leading-relaxed text-muted-foreground/90 font-medium max-w-sm">
                                    {region.description}
                                </p>
                            </div>

                            <div className="pt-4 mt-auto">
                                <Link href={`/explore?region=${region.query}`} className="w-fit">
                                    <button className="w-fit flex items-center justify-center gap-2 px-6 py-4 bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer group/btn">
                                        Explore Region
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegionCatalogs;