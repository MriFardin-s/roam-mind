import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-20">
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary px-4 py-1.5 rounded-full border border-border ">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mt-5">
                        Redefining the Way You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">Explore</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg font-medium leading-relaxed">
                        We are a team of passionate wanderers, developers, and creators dedicated to mapping out the worlds most unique, hidden, and breathtaking destinations.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-card border border-border rounded-[24px] shadow-sm">
                    {[
                        { value: "500+", label: "Destinations Curated" },
                        { value: "50k+", label: "Active Travelers" },
                        { value: "4.9★", label: "User Rating" },
                        { value: "120+", label: "Local Guides" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-4 space-y-1">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">{stat.value}</h2>
                            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Core Values Section */}
                <div className="space-y-12">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Our Core Mission</h2>
                        <p className="text-muted-foreground text-sm font-medium">What drives us to explore the unexplored.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "🗺️", title: "Authentic Discovery", desc: "We focus on real, local experiences that are often skipped by generic commercial tourism guides." },
                            { icon: "🌱", title: "Sustainable Travel", desc: "Promoting eco-friendly tourism that protects local cultures, habitats, and native heritage." },
                            { icon: "⚡", title: "Seamless UI", desc: "Building fast, high-performance web applications using cutting-edge modern development tools." }
                        ].map((value, i) => (
                            <div key={i} className="group p-8 bg-card border border-border/80 hover:border-primary/40 rounded-[24px] transition-all duration-300 shadow-sm flex flex-col gap-4">
                                <div className="text-3xl w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{value.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}