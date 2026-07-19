"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, Leaf, Landmark, Sparkles } from 'lucide-react';

const TravelAesthetics = () => {
    const aesthetics = [
        { name: "Nature & Escape", icon: <Leaf className="w-5 h-5" />, count: "Eco-tours", query: "nature" },
        { name: "Thrill & Adventure", icon: <Compass className="w-5 h-5" />, query: "adventure" },
        { name: "Heritage & Culture", icon: <Landmark className="w-5 h-5" />, query: "culture" },
        { name: "Luxury & Wellness", icon: <Sparkles className="w-5 h-5" />, query: "luxury" }
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-10">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                    Immersive Experiences
                </span>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                    Select Your Travel Aesthetic
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aesthetics.map((item, idx) => (
                    <div key={idx} className="p-8 bg-card border border-border/80 rounded-[24px] flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-sm group">
                        <div className="p-4 bg-secondary text-primary w-fit rounded-xl border border-border/40 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            {item.icon}
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-extrabold text-foreground tracking-tight">{item.name}</h3>
                            <Link href={`/explore?category=${item.query}`}>
                                <button className="px-5 py-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer w-full text-center">
                                    Discover
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TravelAesthetics;