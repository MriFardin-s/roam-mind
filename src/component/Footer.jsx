import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative mt-32 bg-card border-t border-border text-foreground">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -top-16 z-20">
                <div className="bg-gradient-to-r from-primary to-accent-foreground p-8 sm:p-12 rounded-[28px] shadow-xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
                    <div className="space-y-2 text-center md:text-left max-w-xl">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to map your next journey?</h2>
                        <p className="text-primary-foreground/80 text-xs sm:text-sm font-medium leading-relaxed">
                            Join thousands of travelers exploring hidden marvels and curated destinations around the globe.
                        </p>
                    </div>
                    <Link href="/explore" className="flex-shrink-0">
                        <button className="px-6 py-3.5 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 active:scale-95 cursor-pointer">
                            Explore Catalogs
                        </button>
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 border-b border-border pb-12">

                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="inline-block">
                            <h3 className="text-xl font-black tracking-tight">
                                Wonder <span className="text-primary">Catalogs</span>
                            </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-xs">
                            A highly curated hub of architectural marvels, untamed nature, and localized travel experiences.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Navigation</h4>
                        <ul className="space-y-2 text-xs font-bold">
                            <li><Link href="/explore" className="hover:text-primary transition">Explore Paths</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition">Our Mission</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition">Get in Touch</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Legal</h4>
                        <ul className="space-y-2 text-xs font-bold">
                            <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition">Cookie Settings</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Support Connect</h4>
                        <p className="text-xs text-muted-foreground font-medium">Have questions or unique path tips?</p>
                        <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-accent-foreground transition group">
                            Drop an internal mail
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-semibold">
                    <p>© {new Date().getFullYear()} FARDIN.DEV. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-foreground transition">Twitter</a>
                        <a href="#" className="hover:text-foreground transition">GitHub</a>
                        <a href="#" className="hover:text-foreground transition">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}