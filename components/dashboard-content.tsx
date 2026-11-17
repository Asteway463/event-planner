import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CheckCircle2, ArrowRight, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
    let goingCount = 0
    let maybeCount = 0
    let notGoingCount = 0

    for (const r of rsvps) {
        if (r.status === "GOING") goingCount += 1
        else if (r.status === "MAYBE") maybeCount += 1
        else if (r.status === "NOT_GOING") notGoingCount += 1
    }
    return { goingCount, maybeCount, notGoingCount }
}

export async function DashboardContent({
    userId,
    user,
}: {
    userId: string
    user: { name?: string | null; email?: string | null; image?: string | null }
}) {
    const rows = await prisma.event.findMany({
        where: { ownerUserId: userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            eventDate: true,
            location: true,
            isPublic: true,
            _count: { select: { rsvps: true } },
            rsvps: { select: { status: true } },
            invite: { select: { token: true } },
        },
    })

    const totalEvents = rows.length
    const totalRsvps = rows.reduce((sum, e) => sum + e._count.rsvps, 0)
    const totalGoing = rows.reduce(
        (sum, e) => sum + e.rsvps.filter((r) => r.status === "GOING").length,
        0
    )

    const events = rows.map((e) => ({
        id: e.id,
        title: e.title,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        location: e.location,
        isPublic: e.isPublic,
        rsvpCount: e._count.rsvps,
        ...countByStatus(e.rsvps),
        inviteToken: e.invite?.token ?? null,
    }))

    return (
        <div className="flex flex-1 flex-col gap-6">
            {/* Welcome header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Your events</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your events and track attendee responses
                    </p>
                </div>
                <Button asChild>
                    <Link href="/events/new">
                        <span className="flex items-center gap-2">
                            <Plus className="size-4" aria-hidden="true" />
                            Create event
                        </span>
                    </Link>
                </Button>
            </div>

            {/* Stats cards */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <StatCard
                    title="Total events"
                    value={totalEvents}
                    icon={<Calendar className="size-5" />}
                    color="text-violet-600 bg-violet-50"
                />
                <StatCard
                    title="Total RSVPs"
                    value={totalRsvps}
                    icon={<Users className="size-5" />}
                    color="text-blue-600 bg-blue-50"
                />
                <StatCard
                    title="Going"
                    value={totalGoing}
                    icon={<CheckCircle2 className="size-5" />}
                    color="text-emerald-600 bg-emerald-50"
                />
                <StatCard
                    title="Member since"
                    value={
                        user.name?.split(" ")[0] ??
                        user.email?.split("@")[0] ??
                        "You"
                    }
                    icon={<UserIcon className="size-5" />}
                    color="text-rose-600 bg-rose-50"
                />
            </div>

            {/* Event list */}
            {events.length === 0 ? (
                <Card className="text-center">
                    <CardContent className="p-12">
                        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                            <Calendar className="size-8 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <CardTitle>No events yet</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Create your first event and start inviting guests.
                        </p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/events/new">
                                    <span className="flex items-center gap-2">
                                        <Plus className="size-4" aria-hidden="true" />
                                        Create your first event
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    )
}

function StatCard({
    title,
    value,
    icon,
    color,
}: {
    title: string
    value: number | string
    icon: React.ReactNode
    color: string
}) {
    return (
        <Card>
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    )
}

function EventCard({ event }: { event: any }) {
    return (
        <Card className="hover:shadow-md hover:shadow-black/5 transition-all duration-300 group">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Button size="sm" asChild>
                        <Link href={`/events/${event.id}`}>
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    <span>
                        {event.eventDate
                            ? new Date(event.eventDate).toLocaleDateString()
                            : "No date"}
                    </span>
                    {event.location && (
                        <span className="mx-2">•</span>
                    )}
                    {event.location && <span>{event.location}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">RSVPs: {event.rsvpCount}</Badge>
                    <Badge variant="secondary">Going: {event.goingCount}</Badge>
                    <Badge variant="outline">Maybe: {event.maybeCount}</Badge>
                    <Badge variant="outline">Not going: {event.notGoingCount}</Badge>
                </div>
            </CardHeader>
        </Card>
    )
}