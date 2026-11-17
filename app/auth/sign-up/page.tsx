"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Mail, Lock, Google, MailOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<{
        name: string
        email: string
        password: string
        confirmPassword: string
    }>()

    const onSubmit = async (data: {
        name: string
        email: string
        password: string
        confirmPassword: string
    }) => {
        setIsLoading(true)
        setError(null)
        try {
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match")
                return
            }
            const res = await fetch("/api/auth/sign-up/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password, name: data.name }),
            })
            const result = await res.json()
            if (!res.ok) {
                setError(result.error?.message || "Sign up failed")
                return
            }
            if (result.error) {
                setError(result.error.message || "Sign up failed")
            } else {
                setSuccess(true)
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/auth/sign-in/social/google", {
                method: "GET",
                redirect: "manual",
            })
            if (res.status === 302 || res.status === 301) {
                const redirectUrl = res.headers.get("location")
                if (redirectUrl) {
                    window.location.href = redirectUrl
                }
            }
        } catch {
            setError("Google sign-up failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
                <Card className="w-full max-w-md shadow-2xl shadow-black/10 border-border text-center">
                    <CardContent className="p-8 space-y-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="size-8 text-emerald-600" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Account created!</CardTitle>
                        <CardDescription>
                            Your account has been created successfully. You can now sign in and start planning events.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-6">
                        <Button asChild className="w-full">
                            <Link href="/auth/sign-in">Sign in now</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-2xl shadow-black/10 border-border">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Create account</CardTitle>
                    <CardDescription>Join thousands of organizers planning amazing events</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignUp}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 border border-input bg-background hover:bg-muted text-sm font-medium"
                    >
                        <Google className="size-5" aria-hidden="true" />
                        Continue with Google
                    </Button>

                    <div className="relative flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="grow border-t border-border" />
                        <span className="shrink-0 px-2">Or create with email</span>
                        <div className="grow border-t border-border" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                                placeholder="Jane Doe"
                                className={cn(
                                    "input",
                                    errors.name && "border-destructive"
                                )}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

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
                                        value: 8,
                                        message: "Password must be at least 8 characters",
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

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input
                                id="confirmPassword"
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="••••••••"
                                className={cn(
                                    "input",
                                    errors.confirmPassword && "border-destructive"
                                )}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                                <MailOpen className="size-4" aria-hidden="true" />
                                {error}
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Creating account…" : "Create account"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 text-center text-sm">
                    <p className="text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ")
}