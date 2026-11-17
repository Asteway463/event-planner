"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Mail, Lock, Chrome, MailOpen } from "lucide-react"
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
                        <Chrome className="size-5" aria-hidden="true" />
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