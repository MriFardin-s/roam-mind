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
import { signUp } from "@/lib/auth-client";

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
                router.push("/");
                // console.log("Signup Success:", data);
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
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

                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
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