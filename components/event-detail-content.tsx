import { prisma } from "@/lib/prisma"
import { countByStatus } from "@/components/dashboard-content"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { createInviteLinkAction, deleteInviteLinkAction, updateEventAction, deleteEventAction } from "@/lib/actions/events"
import { InviteLinkActions } from "@/components/invite-link-actions"
import { Calendar, Users, MapPin, Share2, Copy, Check, Trash2, Edit2, ShieldCheck } from "@/components/icons"

export async function EventDetailContent({
    userId,
    eventId,
    user,
}: {
    userId: string
    eventId: string
    user: { name?: string | null; email?: string | null; image?: string | null }
}) {
    const row = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: {
            id: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
            isPublic: true,
            invite: { select: { token: true } },
            rsvps: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    respondedAt: true,
                    userId: true,
                },
                orderBy: { respondedAt: "desc" },
            },
        },
    })

    if (!row) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-2xl font-bold">Event not found</h1>
                <p className="mt-4 text-muted-foreground">
                    This event doesn't exist or you don't have access to it.
                </p>
                <Link href="/dashboard">
                    <Button>Go to dashboard</Button>
                </Link>
            </div>
        )
    }

    const counts = countByStatus(row.rsvps)
    const event = {
        id: row.id,
        title: row.title,
        description: row.description,
        location: row.location,
        eventDate: row.eventDate ? row.eventDate.toISOString() : null,
        isPublic: row.isPublic,
        inviteToken: row.invite?.token ?? null,
        rsvps: row.rsvps.map((r) => ({
            id: r.id,
            name: r.name,
            email: r.email,
            status: r.status,
            respondedAt: r.respondedAt,
            isOwner: r.userId === userId,
        })),
        goingCount: counts.goingCount,
        maybeCount: counts.maybeCount,
        notGoingCount: counts.notGoingCount,
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")
    const inviteUrl = event.inviteToken
        ? `${appUrl ?? ""}/invite/${event.inviteToken}`
        : null

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="px-2 py-1">
                            {event.isPublic ? "Public" : "Private"}
                        </Badge>
                        <ShieldCheck className="size-4 text-violet-600" aria-hidden="true" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-4" aria-hidden="true" />
                        {event.eventDate
                            ? new Date(event.eventDate).toLocaleString()
                            : "No date selected"}
                    </p>
                    {event.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-4" aria-hidden="true" />
                            {event.location}
                        </p>
                    )}
                    {event.description && (
                        <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                            {event.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button variant="outline" size="sm">
                            <span className="flex items-center gap-2">
                                <ArrowLeft className="size-4" aria-hidden="true" />
                                Back to dashboard
                            </span>
                        </Button>
                    </Link>
                    <Button asChild size="sm">
                        <Link href={`/events/${event.id}/edit`}>
                            <Edit2 className="size-4" aria-hidden="true" />
                            Edit
                        </Link>
                    </Button>
                </div>
            </div>

            {/* RSVP stats */}
            <div className="flex flex-wrap gap-2 text-sm">
                <Badge variant="default">Going: {event.goingCount}</Badge>
                <Badge variant="secondary">Maybe: {event.maybeCount}</Badge>
                <Badge variant="outline">Not going: {event.notGoingCount}</Badge>
                <Badge variant="ghost">Total: {event.rsvps.length}</Badge>
            </div>

            {/* Invite link card */}
            <Card>
                <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                        <Share2 className="size-4 text-violet-600" aria-hidden="true" />
                        Invite link
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Share this link with guests so they can RSVP without creating an account.
                    </p>
                </CardHeader>
                <CardContent className="pt-0">
                    {inviteUrl ? (
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1 rounded-xl border border-input bg-background p-4 text-sm font-mono text-foreground break-all">
                                    {inviteUrl}
                                </div>
                                <InviteLinkActions inviteUrl={inviteUrl} />
                            </div>
                            <Button type="button" onClick={() => deleteInviteLinkAction(event.id)} variant="destructive" size="sm">
                                <Trash2 className="size-4 mr-2" aria-hidden="true" />
                                Remove invite link
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                No invite link generated yet. Create one to start collecting RSVPs.
                            </p>
                            <Form
                                action={(formData: FormData) =>
                                    createInviteLinkAction(event.id)
                                }
                            >
                                <Button type="submit" className="w-full">
                                    <span className="flex items-center justify-center gap-2">
                                        <ShieldCheck className="size-4" aria-hidden="true" />
                                        Generate invite link
                                    </span>
                                </Button>
                            </Form>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* RSVPs list */}
            <Card>
                <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="size-4 text-violet-600" aria-hidden="true" />
                        Guest responses ({event.rsvps.length})
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        See who is coming, maybe, or not going.
                    </p>
                </CardHeader>
                <CardContent className="pt-0">
                    {event.rsvps.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                No RSVPs yet. Share your invite link to start collecting responses.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left">
                                        <th className="pb-3 font-medium text-muted-foreground">Guest</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Email</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Response</th>
                                        <th className="pb-3 font-medium text-muted-foreground">Responded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.rsvps.map((rsvp) => (
                                        <tr
                                            key={rsvp.id}
                                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-medium dark:bg-violet-900/30 dark:text-violet-400">
                                                        {rsvp.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium">{rsvp.name}</span>
                                                    {rsvp.isOwner && (
                                                        <span className="text-xs bg-violet-600/10 text-violet-600 px-2 py-0.5 rounded-full">You</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 text-muted-foreground">{rsvp.email}</td>
                                            <td className="py-4">
                                                <Badge
                                                    variant={
                                                        rsvp.status === "GOING"
                                                            ? "default"
                                                            : rsvp.status === "MAYBE"
                                                                ? "secondary"
                                                                : "outline"
                                                    }
                                                >
                                                    {rsvp.status === "GOING"
                                                        ? "Going"
                                                        : rsvp.status === "MAYBE"
                                                            ? "Maybe"
                                                            : "Not going"}
                                                </Badge>
                                            </td>
                                            <td className="py-4 text-muted-foreground">
                                                {rsvp.respondedAt
                                                    ? new Date(rsvp.respondedAt).toLocaleDateString()
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete event */}
            <Card>
                <CardContent className="p-5">
                    <Button type="button" onClick={() => deleteEventAction(event.id)} variant="destructive" size="sm" className="w-auto">
                        <Trash2 className="size-4 mr-2" aria-hidden="true" />
                        Delete event
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

function ArrowLeft({ className }: { className?: string }) {
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
                d="M15 19l-7-7 7-7"
            />
        </svg>
    )
}