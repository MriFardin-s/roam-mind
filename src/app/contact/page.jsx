"use client";

import React, { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary px-4 py-1.5 rounded-full border border-border">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                        Let’s Talk About Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">Adventure</span>
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    
                    {/* Left: Contact Info Info Box */}
                    <div className="lg:col-span-2 space-y-4">
                        {[
                            { title: "Email Us", details: "hello@fardin.dev", icon: "✉️" },
                            { title: "Call Support", details: "+880 1234 567890", icon: "📞" },
                            { title: "Headquarters", details: "Dhaka, Bangladesh", icon: "📍" }
                        ].map((info, i) => (
                            <div key={i} className="flex items-center gap-5 p-5 bg-card border border-border/70 rounded-2xl shadow-sm">
                                <div className="text-xl w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center border border-border flex-shrink-0">
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{info.title}</h3>
                                    <p className="text-sm font-bold mt-0.5">{info.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Modern Contact Form */}
                    <div className="lg:col-span-3 bg-card border border-border p-8 sm:p-10 rounded-[28px] shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        className="w-full px-4 py-3 text-sm bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground/60 transition"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        className="w-full px-4 py-3 text-sm bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground/60 transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground block">Your Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Write your query details here..."
                                    value={form.message}
                                    onChange={(e) => setForm({...form, message: e.target.value})}
                                    className="w-full px-4 py-3 text-sm bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground/60 transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary hover:bg-foreground text-primary-foreground hover:text-background font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
                            >
                                Send Message ⚡
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}