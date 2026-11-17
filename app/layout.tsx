import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Event Planner",
    description:
        "Create events, share invite links, and track RSVPs in one place. Simple, modern event planning for everyone.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className="h-full antialiased selection:bg-violet-600 selection:text-white"
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-violet-600 p-2">
                                <svg
                                    className="size-5 text-white"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <Link href="/" className="text-sm font-semibold tracking-tight">
                                Event<span className="text-violet-600">Planner</span>
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Home
                            </Link>
                            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/sign-in"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/auth/sign-up"
                                className="text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-xl px-4 py-2 transition-colors"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="flex-1">{children}</main>
            </body>
        </html>
    )
}