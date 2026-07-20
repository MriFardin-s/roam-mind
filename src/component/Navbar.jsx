'use client';

import { useState, useRef } from 'react';
import { Bars, Xmark } from '@gravity-ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import { useTheme } from './theme-provider';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();

    const { theme, setTheme } = useTheme();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const showPrivateLinks = isPending || !!user;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore Destinations', href: '/explore' },
        ...(showPrivateLinks ? [
            { name: 'Smart Recommendations', href: '/planner' },
            { name: 'Ask Roam Mind AI', href: '/explore-ai' }
        ] : [])
    ];


    const handleSignOut = async () => {
        try {
            setIsLoggingOut(true);
            setIsMobileMenuOpen(false);

            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/auth/signin";
                    },
                },
            });

            window.location.href = "/auth/signin";
        } catch (error) {
            console.error("Sign out failed:", error);
            setIsLoggingOut(false);
        }
    };

    if (isLoggingOut) {
        return (
            <nav className="bg-card text-card-foreground shadow-md border-b border-border sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="flex items-center text-2xl sm:text-3xl tracking-tighter cursor-pointer select-none font-black">
                            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                                Roam
                            </span>
                            <span className="mx-0.5 text-primary animate-pulse">•</span>
                            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase pr-2 inline-block">
                                Mind
                            </span>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-muted-foreground">Signing out...</span>
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-card text-card-foreground shadow-md border-b border-border sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none transition"
                        >
                            {isMobileMenuOpen ? <Xmark width="24" height="24" /> : <Bars width="24" height="24" />}
                        </button>
                    </div>

                    <Link href="/" className="flex items-center text-2xl sm:text-3xl tracking-tighter cursor-pointer select-none font-black">
                        <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                            Roam
                        </span>
                        <span className="mx-0.5 text-primary animate-pulse">•</span>
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase pr-2 inline-block">
                            Mind
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-8 font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-all duration-200 pb-1 border-b-2 ${isActive
                                        ? 'text-foreground font-bold border-primary'
                                        : 'text-muted-foreground border-transparent hover:text-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1-0 011-1zM5.05 14.036a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>


                        {isPending ? (
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-24 bg-muted animate-pulse rounded-lg hidden sm:block" />
                                <div className="h-9 w-24 bg-muted animate-pulse rounded-lg" />
                            </div>
                        ) : user ? (
                            <div className="flex items-center space-x-3">
                                <div className="relative" ref={dropdownRef}>

                                    {/* Dropdown Trigger Button */}
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-foreground cursor-pointer hover:opacity-80 transition select-none py-2"
                                    >
                                        Hi, {user.name}!
                                        <svg
                                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Desktop Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50 animate-fade-in">
                                            <Link
                                                href="/add-items"
                                                onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                                                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium transition-colors"
                                            >
                                                Add Destination
                                            </Link>
                                            <hr className="border-border my-1" />
                                            <Link
                                                href="/manage-items"
                                                onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                                                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium transition-colors"
                                            >
                                                Manage destinations
                                            </Link>
                                            {/* <hr className="border-border my-1" /> */}

                                        </div>
                                    )}
                                </div>

                                {/* Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="flex items-center px-4 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 rounded-xl transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
                                >
                                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link
                                    href="/auth/signin"
                                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname === '/auth/signin'
                                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                                        : 'text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50 border border-transparent'
                                        }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname === '/auth/signup'
                                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                                        : 'text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50 border border-transparent'
                                        }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-card border-t border-border px-4 pt-2 pb-4 space-y-1 transition-colors duration-300">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Switch Theme</span>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-muted text-foreground transition"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1-0 011-1zM5.05 14.036a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-xl text-base font-semibold transition ${isActive
                                    ? 'bg-accent text-accent-foreground font-bold'
                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="pt-4 border-t border-border flex flex-col space-y-2">
                        {isPending ? (
                            <div className="flex items-center justify-center py-3">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : user ? (
                            <div className="flex flex-col space-y-1">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-base font-semibold text-muted-foreground hover:bg-muted/50 hover:text-foreground cursor-pointer transition"
                                >
                                    <span>Hi, {user.name}!</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="pl-4 flex flex-col space-y-1 bg-muted/20 rounded-xl py-1 mt-1 border border-border/50">
                                        <Link
                                            href="/add-items"
                                            onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium transition-colors"
                                        >
                                            Add Destination
                                        </Link>
                                        <hr className="border-border my-1" />
                                        <Link
                                            href="/manage-items"
                                            onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium transition-colors"
                                        >
                                            Manage destinations
                                        </Link>
                                    </div>
                                )}

                                <button
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="w-full text-left px-3 py-2.5 mt-2 rounded-xl text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-50 cursor-pointer transition-colors duration-200"
                                >
                                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2 pt-2">
                                <Link
                                    href="/auth/signin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-xl text-sm text-center font-semibold border transition-all duration-200 ${pathname === '/auth/signin'
                                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20 border-transparent'
                                        : 'text-muted-foreground bg-transparent hover:bg-muted/50 border-border'
                                        }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-xl text-sm text-center font-semibold border transition-all duration-200 ${pathname === '/auth/signup'
                                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20 border-transparent'
                                        : 'text-muted-foreground bg-transparent hover:bg-muted/50 border-border'
                                        }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}