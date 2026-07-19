"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    Form,
    TextField,
    Label,
    Input
} from '@heroui/react';
import {
    Envelope,
    Key,
    Eye,
    EyeSlash
} from '@gravity-ui/icons';

import Link from "next/link";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            const { data, error: authError } = await signIn.email({
                email: email,
                password: password,
                callbackURL: "/",
            });

            if (authError) {
                setError(authError.message || "Invalid email or password");
            } else {
                toast.success("Welcome back! Signing you in...");

                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 1000);
            }

        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = (role) => {
        if (role === "user") {
            setEmail("u7@g.com");
            setPassword("admin123");
        } else {
            setEmail("admin@g.com");
            setPassword("Admin123");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-md bg-card text-card-foreground p-8 rounded-2xl shadow-xl border border-border/50">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[var(--theme-text)]">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-[var(--theme-text)] opacity-70 mt-2">
                        Sign in to access your favorite destinations and account
                    </p>
                </div>

                <div className="mb-6 p-4 bg-card rounded-xl border border-dashed border-border">
                    <p className="text-xs text-muted-foreground text-center mb-3 font-medium tracking-wide">
                        Quick Demo Login:
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("user")}
                            className="flex-1 py-2.5 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center shadow-sm"
                        >
                            Demo User
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin("admin")}
                            className="flex-1 py-2.5 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer text-center shadow-sm"
                        >
                            Demo Admin
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg mb-4 text-center font-medium">
                        {error}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className="space-y-5">
                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Email Address</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Envelope className="w-4 h-4" />
                            </span>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </TextField>

                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Password</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Key className="w-4 h-4" />
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="Enter Your Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-[var(--theme-text)] opacity-50 hover:opacity-80 transition-opacity z-10 cursor-pointer"
                            >
                                {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full py-3 rounded-lg btn-theme-brown mt-4 cursor-pointer transition-all duration-300 flex items-center justify-center font-bold text-[#fffdfa] disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </Form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/60"></div>
                    </div>
                    <span className="relative bg-card px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                        Or Continue With
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-secondary text-foreground hover:bg-primary/60 border border-border/80 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2.5 shadow-sm"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#4285F4"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    Google
                </button>

                <div className="text-center mt-6">
                    <p className="text-xs text-muted-foreground font-medium">
                        Do not have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="text-primary font-bold hover:underline transition-all duration-200"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}