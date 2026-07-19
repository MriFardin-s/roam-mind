"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PlatformCTA = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="w-full p-8 md:p-12 bg-foreground text-background rounded-[32px] relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="space-y-4 max-w-lg relative z-10 text-center md:text-left">
                    <span className="text-xs font-black uppercase tracking-widest text-primary-foreground/80 bg-primary/20 px-3 py-1 rounded-md border border-primary/30">
                        Join The Network
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-background leading-tight">
                        Ready to document your next exploration?
                    </h2>
                    <p className="text-xs font-medium text-background/70 leading-relaxed">
                        Subscribe to get deployment logs of newly verified international entries and bleeding-edge itinerary schemas weekly.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-4 relative z-10">
                    <input 
                        type="email" 
                        placeholder="Enter your system email..." 
                        className="w-full sm:w-64 px-5 py-3.5 bg-background text-foreground border border-border/20 rounded-xl font-bold text-xs focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/60"
                    />
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-background text-foreground hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap group shadow-md">
                        Join Engine
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PlatformCTA;