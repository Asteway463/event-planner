import Link from "next/link"
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Link2,
    MessageCircle,
    Users,
    Zap,
    ShieldCheck,
    Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="flex flex-1 flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-500/10 rounded-full blur-[80px]" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-medium dark:border-violet-800/50 dark:bg-violet-900/30 dark:text-violet-300">
                                <Zap className="size-4" aria-hidden="true" />
                                Now with Google sign-in
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                Plan events{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">
                                    that bring people together
                                </span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                                Set the details, send one invite link, and stop chasing
                                replies across different group chats. RSVPs, reminders,
                                and guest lists — all in one beautiful place.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" asChild className="shadow-lg shadow-violet-600/25">
                                    <Link href="/auth/sign-up">
                                        Get started free <ArrowRight className="ml-2 size-5" aria-hidden="true" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="shadow-sm">
                                    <Link href="/auth/sign-in">Sign in</Link>
                                </Button>
                            </div>

                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-muted-foreground text-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-foreground">50K+</span>
                                    <span>events created</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-foreground">200K+</span>
                                    <span>RSVPs tracked</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-foreground">99%</span>
                                    <span>uptime</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-foreground">2 min</span>
                                    <span>setup time</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 p-8 sm:p-12">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl" />
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-border bg-muted/50 text-sm">
                                        <ShieldCheck className="size-4 text-violet-600" aria-hidden="true" />
                                        <span>Google sign-in enabled</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-border bg-background">
                                            <CalendarDays className="size-5 text-violet-600" aria-hidden="true" />
                                            <p className="mt-2 text-sm font-medium">Set date &amp; time</p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-border bg-background">
                                            <Users className="size-5 text-violet-600" aria-hidden="true" />
                                            <p className="mt-2 text-sm font-medium">Invite guests</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-border bg-background">
                                        <MessageCircle className="size-5 text-violet-600" aria-hidden="true" />
                                        <p className="mt-2 text-sm font-medium">Track RSVPs live</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 border-y border-border bg-background/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to organize
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            From the first idea to the final headcount, we’ve got you covered.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<CalendarDays className="size-6 text-violet-600" />}
                            title="Set the details"
                            description="Add your event title, date, time, location, and description in minutes."
                        />
                        <FeatureCard
                            icon={<Link2 className="size-6 text-violet-600" />}
                            title="Share one link"
                            description="Send a single invite link wherever your guests already chat — WhatsApp, email, iMessage, and more."
                        />
                        <FeatureCard
                            icon={<CheckCircle2 className="size-6 text-violet-600" />}
                            title="Track RSVPs"
                            description="See who’s going, maybe, or not going — all in one dashboard, no spreadsheets needed."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 to-violet-700 p-8 sm:p-12 text-center shadow-xl shadow-violet-600/25">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Ready to organize your next event?
                        </h2>
                        <p className="mt-4 text-violet-100 max-w-xl mx-auto text-lg">
                            Sign up with Google in one click and start planning today.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild className="shadow-lg shadow-violet-600/30">
                                <Link href="/auth/sign-up">
                                    Get started with Google
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                                <Link href="/dashboard">View demo</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="p-6 rounded-2xl border border-border bg-card hover:border-violet-200/50 transition-colors duration-300">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mb-4 dark:bg-violet-900/30 dark:text-violet-400">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    )
}