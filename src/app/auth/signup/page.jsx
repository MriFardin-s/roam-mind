"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Button,
    Card,
    Form,
    TextField,
    Label,
    Input,
} from '@heroui/react';
import {
    Envelope,
    Key,
    Person,
    Eye,
    EyeSlash
} from '@gravity-ui/icons';

import { useRouter, usePathname } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const { data, error: authError } = await signUp.email({
                email: email,
                password: password,
                name: name,
            });

            if (authError) {
                setError(authError.message || "Signup failed");
            } else {
                toast.success("Account created successfully! redirecting.....");
                router.push("/");
                // console.log("Signup Success:", data);
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error("Google Auth Error:", err);
            toast.error("Google signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-[calc(100-4rem)] flex items-center justify-center p-4 transition-colors duration-300 mt-10">
            <Card className="w-full max-w-md bg-card text-card-foreground p-8 rounded-2xl shadow-xl border border-border/50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Join us to manage and explore your favorite destinations and account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl mb-5 text-center font-semibold border border-red-500/20">
                        {error}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-muted-foreground opacity-70 z-10 pointer-events-none">
                                <Person className="w-4 h-4" />
                            </span>
                            <Input
                                type="text"
                                name="name"
                                required
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary transition"
                                placeholder="John Doe"
                            />
                        </div>
                    </TextField>

                    {/* Email Address */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-muted-foreground opacity-70 z-10 pointer-events-none">
                                <Envelope className="w-4 h-4" />
                            </span>
                            <Input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary transition"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </TextField>

                    {/* Password */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-semibold text-foreground mb-1.5">Password</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-muted-foreground opacity-70 z-10 pointer-events-none">
                                <Key className="w-4 h-4" />
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer"
                            >
                                {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </TextField>

                    {/* Confirm Password */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-semibold text-foreground mb-1.5">Confirm Password</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-muted-foreground opacity-70 z-10 pointer-events-none">
                                <Key className="w-4 h-4" />
                            </span>
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none focus:border-primary transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all duration-200 mt-2 cursor-pointer flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
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
                    onClick={handleGoogleSignup}
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
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="text-primary font-bold hover:underline transition-all duration-200"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}