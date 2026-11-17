"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Mail, Lock, MailOpen } from "lucide-react"

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<{
        email: string
        password: string
    }>()

    const onSubmit = async (data: { email: string; password: string }) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/auth/sign-in/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password }),
            })
            const result = await res.json()
            if (!res.ok) {
                setError(result.error?.message || "Sign in failed")
                return
            }
            if (result.error) {
                setError(result.error.message || "Sign in failed")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        setError(null)
        try {
            // Navigate directly so the browser processes Set-Cookie headers
            // from the OAuth initiation response
            window.location.href = "/api/auth/sign-in/social/google"
        } catch {
            setError("Google sign-in failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-2xl shadow-black/10 border-border">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                    <CardDescription>Sign in to your account to manage your events</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 border border-input bg-background hover:bg-muted text-sm font-medium"
                    >
                        <GoogleIcon className="size-5" />
                        Continue with Google
                    </Button>

                    <div className="relative flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="grow border-t border-border" />
                        <span className="shrink-0 px-2">Or continue with email</span>
                        <div className="grow border-t border-border" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                type="email"
                                placeholder="you@example.com"
                                className={cn(
                                    "input",
                                    errors.email && "border-destructive"
                                )}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                type="password"
                                placeholder="••••••••"
                                className={cn(
                                    "input",
                                    errors.password && "border-destructive"
                                )}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                                <MailOpen className="size-4" aria-hidden="true" />
                                {error}
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Signing in…" : "Sign in"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 text-center text-sm">
                    <p className="text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link
                            href="/auth/sign-up"
                            className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
                        >
                            Create an account
                        </Link>
                    </p>
                    <Link
                        href="/auth/forgot-password"
                        className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
                    >
                        Forgot your password?
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ")
}