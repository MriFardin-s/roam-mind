"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Users, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { getPlatformStats } from '@/lib/api/destinations';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-xl p-3 shadow-md text-xs font-bold text-foreground space-y-1">
                <p className="uppercase tracking-wider text-muted-foreground mb-1">{payload[0].payload.name}</p>
                {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span>{item.name}: {item.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const DashboardStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await getPlatformStats();
                if (result?.success) {
                    setStats(result.data);
                }
            } catch (error) {
                console.error("Error loading stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center text-xs font-black uppercase tracking-widest text-muted-foreground">
                Loading Statistics...
            </div>
        );
    }

    const chartData = [
        {
            name: 'Users',
            Total: stats?.totalUsers || 0,
            'Last 1 Year': stats?.lastYearUsers || 0
        },
        {
            name: 'Destinations',
            Total: stats?.totalDestinations || 0,
            'Last 1 Year': stats?.lastYearDestinations || 0
        }
    ];

    const cards = [
        {
            title: "Total Registered Users",
            value: stats?.totalUsers || 0,
            icon: <Users className="w-5 h-5 text-primary" />,
            desc: "All-time users on platform"
        },
        {
            title: "Total Destinations",
            value: stats?.totalDestinations || 0,
            icon: <MapPin className="w-5 h-5 text-primary" />,
            desc: "Catalogs added by community"
        },
        {
            title: "New Users (Last Year)",
            value: stats?.lastYearUsers || 0,
            icon: <Calendar className="w-5 h-5 text-primary" />,
            desc: "Joined within the last 365 days"
        },
        {
            title: "New Destinations (Last Year)",
            value: stats?.lastYearDestinations || 0,
            icon: <TrendingUp className="w-5 h-5 text-primary" />,
            desc: "Catalogs built within the last year"
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                    Platform Analytics
                </span>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                    Wonder Catalogs In Metrics
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="p-6 bg-card border border-border/80 rounded-[20px] flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-extrabold text-muted-foreground tracking-tight uppercase">
                                {card.title}
                            </span>
                            <div className="p-2.5 bg-secondary rounded-xl border border-border/40">
                                {card.icon}
                            </div>
                        </div>
                        <div>
                            <span className="text-4xl font-black tracking-tight text-foreground">
                                {card.value}
                            </span>
                            <p className="text-[11px] font-medium text-muted-foreground/80 mt-1">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 md:p-8 bg-card border border-border/80 rounded-[24px] shadow-sm">
                <div className="mb-6">
                    <h3 className="text-lg font-black tracking-tight text-foreground">
                        Growth & Comparison Overview
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                        Comparing total data records against the past years performance.
                    </p>
                </div>

                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                            <XAxis
                                dataKey="name"
                                stroke="currentColor"
                                className="text-muted-foreground font-bold text-[11px] uppercase tracking-wider"
                                tickLine={false}
                            />
                            <YAxis
                                stroke="currentColor"
                                className="text-muted-foreground font-bold text-[11px]"
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--secondary)', opacity: 0.15 }} />
                            <Legend 
                                verticalAlign="top" 
                                alignmentBaseline="middle"
                                height={36} 
                                iconType="circle"
                                iconSize={8}
                                className="text-xs font-bold text-foreground" 
                            />
                            <Bar 
                                dataKey="Total" 
                                fill="#0f172a" 
                                activeBar={{ fill: '#475569' }} 
                                radius={[6, 6, 0, 0]} 
                                maxBarSize={45} 
                            />
                            <Bar 
                                dataKey="Last 1 Year" 
                                fill="#3b82f6" 
                                activeBar={{ fill: '#60a5fa' }} 
                                radius={[6, 6, 0, 0]} 
                                maxBarSize={45} 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default DashboardStats;