'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: "Architectural Marvels",
        tagline: "Discover structures that redefine the horizon.",
        bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Untamed Wildness",
        tagline: "Uncover hidden sanctuaries untouched by time.",
        bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Localized Paths",
        tagline: "Walk the stories told by generations.",
        bg: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight * 0.65,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative h-[65vh] min-h-[500px] max-h-[650px] w-full bg-background overflow-hidden border-b border-border">

            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.35, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].bg})` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">

                    <div className="lg:col-span-7 space-y-6">
                        <div className="overflow-hidden py-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-100%" }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                >
                                    <span className="text-xs font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1.5 rounded-md border border-primary/20">
                                        Wonder Catalogs
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="h-[90px] sm:h-[120px] relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={current}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-none absolute inset-0"
                                >
                                    {slides[current].title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>

                        <div className="h-[40px] relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={current}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="text-sm sm:text-base text-muted-foreground font-medium max-w-md absolute inset-0"
                                >
                                    {slides[current].tagline}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-4 flex flex-wrap items-center gap-4"
                        >
                            <Link href="/explore-ai">
                                <button onClick={() => {
                                    window.scrollTo({
                                        top: window.innerHeight * 0.65,
                                        behavior: 'smooth'
                                    });
                                }} className="group px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2">
                                    Start Journey
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </Link>


                            <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-sm">
                                <button onClick={prevSlide} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition cursor-pointer">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-black tracking-widest px-3 min-w-[45px] text-center text-muted-foreground">
                                    0{slides[current].id}
                                </span>
                                <button onClick={nextSlide} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition cursor-pointer">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="hidden lg:col-span-5 lg:flex justify-end relative h-[320px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 50, rotate: 2 }}
                                animate={{ opacity: 1, x: 0, rotate: -2 }}
                                exit={{ opacity: 0, x: -50, rotate: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-[85%] h-full rounded-[24px] overflow-hidden border border-border shadow-2xl relative bg-card"
                            >
                                <img
                                    src={slides[current].bg}
                                    alt={slides[current].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-md border border-white/10">
                                        Live Catalog View
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute -inset-1 border border-dashed border-primary/20 rounded-[32px] -z-10 transform rotate-1 scale-95 pointer-events-none" />
                    </div>

                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
                <span className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/60">
                    Scroll down
                </span>
                <motion.button
                    onClick={scrollToNext}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="p-2 bg-card border border-border hover:border-primary/40 rounded-full shadow-md text-muted-foreground hover:text-primary transition cursor-pointer active:scale-95"
                >
                    <ArrowDown className="w-3.5 h-3.5" />
                </motion.button>
            </div>

        </section>
    );
}