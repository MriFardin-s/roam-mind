import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-base-100 text-base-content">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Visual Icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-base-200/80 border border-base-content/10 shadow-sm mb-2">
                    <Compass className="w-12 h-12 text-primary animate-pulse" />
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-error text-error-content text-[10px] font-black uppercase tracking-widest rounded-full">
                        404
                    </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Lost Your <span className="text-primary">Way?</span>
                    </h1>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                        The destination or page you are looking for does not exist or has been moved to another location.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                    <Link href="/explore" className="block w-full">
                        <button className="w-full py-3 bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center flex items-center justify-center gap-2 group">
                            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                            <span>Explore Destinations</span>
                        </button>
                    </Link>

                    <Link href="/" className="block w-full">
                        <button className="w-full py-3 bg-base-200 hover:bg-base-300 text-base-content font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            <span>Back to Home</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}