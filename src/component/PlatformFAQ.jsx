"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PlatformFAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);

    const faqs = [
        { q: "How do I get my destination catalog approved?", a: "Once submitted, your entry enters a status:'pending' verification phase. Community curators evaluate geo-coordinates and imagery resolution before pushing it live." },
        { q: "What distinguishes Domestic from International partitions?", a: "Domestic catalogs filter locations within home borders, while International routes aggregate multi-border itineraries requiring visa protocols." },
        { q: "Can I query the platform API directly for custom integration?", a: "Yes, verified developer tokens can hit our /api/destinations endpoint with custom region and rating query parameters." }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-10 text-center">
                <span className="text-xs font-black uppercase tracking-widest text-primary">System Integrity FAQ</span>
                <h2 className="text-3xl font-black tracking-tight text-foreground">Frequently Answered Protocols</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-card border border-border/80 rounded-[20px] overflow-hidden transition-all duration-300">
                        <button 
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-6 text-left font-extrabold text-sm tracking-tight text-foreground cursor-pointer transition-colors duration-200 hover:bg-secondary/40"
                        >
                            <span>{faq.q}</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openIdx === idx ? 'transform rotate-180 text-primary' : ''}`} />
                        </button>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIdx === idx ? 'max-h-40 border-t border-border/40' : 'max-h-0'}`}>
                            <p className="p-6 text-xs text-muted-foreground font-medium leading-relaxed bg-secondary/10">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlatformFAQ;