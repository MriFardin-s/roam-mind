'use client';

import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function Error() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-base-100 text-base-content">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Visual Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-error/10 border border-error/20 text-error mb-2">
                    <AlertTriangle className="w-10 h-10" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">
                        Something Went <span className="text-error">Wrong!</span>
                    </h1>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                        An unexpected error occurred while processing your request. Please head back to home and try again.
                    </p>
                </div>

                {/* Single Action Button */}
                <div className="pt-4">
                    <Link href="/" className="block w-full">
                        <button className="w-full py-3 bg-secondary hover:bg-primary text-black border hover:text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center flex items-center justify-center gap-2 group">
                            <Home className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>Return Home</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}