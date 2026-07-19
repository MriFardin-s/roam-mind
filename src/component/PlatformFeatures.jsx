"use client";

import React from 'react';
import { Cpu, ShieldCheck, Share2 } from 'lucide-react';

const PlatformFeatures = () => {
    const features = [
        { title: "AI-Driven Planning", desc: "Instantly draft structured itineraries backed by dynamic community insights and geo-data.", icon: <Cpu className="w-5 h-5 text-primary" /> },
        { title: "Curated Verification", desc: "Every pending domestic or international entry goes through rigorous community mapping validation.", icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
        { title: "Collective Ecosystem", desc: "Seamlessly publish your travel documentations and monetize your premium route insights.", icon: <Share2 className="w-5 h-5 text-primary" /> }
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-secondary/30 rounded-[32px] border border-border/40">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 space-y-4">
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Architectural Pillars</span>
                    <h2 className="text-3xl font-black tracking-tight text-foreground leading-tight">Engineered for Modern Explorers</h2>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">We bypass traditional legacy guides to bring structured, filtered metadata straight from database nodes to your viewport.</p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feat, idx) => (
                        <div key={idx} className="p-6 bg-card border border-border/80 rounded-[20px] space-y-3 shadow-sm">
                            <div className="p-2.5 bg-secondary border border-border/40 w-fit rounded-xl">{feat.icon}</div>
                            <h3 className="font-extrabold text-base text-foreground tracking-tight">{feat.title}</h3>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformFeatures;