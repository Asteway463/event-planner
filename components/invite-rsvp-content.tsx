import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { submitRsvpForToken } from "@/lib/actions/events"
import { Calendar, Mail, CheckCircle2, Clock } from "lucide-react"

export async function InviteRsvpContent({
    token,
    submitted,
}: {
    token: string
    submitted: boolean
}) {
    const row = await prisma.eventInvite.findFirst({
        where: { token },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true,
                    isPublic: true,
                },
            },
        },
    })

    if (!row) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                        <Calendar className="size-8 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Invite not found</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        This invitation link is invalid or has expired.
                    </p>
                </div>
            </div>
        )
    }

    const e = row.event
    const event = {
        title: e.title,
        description: e.description,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        location: e.location,
        isPublic: e.isPublic,
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-2xl shadow-black/10 border-border">
                <CardHeader className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center mx-auto">
                        <Calendar className="size-6 text-white" aria-hidden="true" />
                    </div>
                    <Badge variant="secondary" className="mx-auto w-fit px-3 py-1">
                        RSVP
                    </Badge>
                    <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" aria-hidden="true" />
                        <span>
                            {event.eventDate
                                ? new Date(event.eventDate).toLocaleString()
                                : "No date selected"}
                        </span>
                    </div>
                    {event.location && (
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Mail className="size-4" aria-hidden="true" />
                            <span>{event.location}</span>
                        </div>
                    )}
                    {event.description && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {event.description}
                        </p>
                    )}
                </CardHeader>

                <CardContent className="space-y-5">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="size-8 text-emerald-600" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-bold">Response recorded!</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Thank you for RSVPing. We'll see you there!
                            </p>
                        </div>
                    ) : (
                        <Form action={submitRsvpForToken} className="space-y-4">
                            <input type="hidden" name="token" value={token} />

                            <div className="space-y-2">
                                <Label htmlFor="name">Your name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Jane Doe"
                                    className="h-10 rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email (optional)</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-10 rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Your response</Label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue="GOING"
                                    className="h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                                >
                                    <option value="GOING">Going</option>
                                    <option value="MAYBE">Maybe</option>
                                    <option value="NOT_GOING">Not going</option>
                                </select>
                            </div>

                            <Button type="submit" className="w-full py-3">
                                Submit RSVP
                            </Button>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}