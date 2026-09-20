import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "./dashboard-content";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form } from "./ui/form";
import { createInviteLinkAction } from "@/lib/actions/events";

export async function EventDetailContent({
    userId,
    eventId,
}: {
    userId: string;
    eventId: string;
}) {
    const row = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: {
            id: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
            invite: { select: { token: true } },
            rsvps: { select: { status: true } },


        },
    });

    if (!row) {
        notFound();
    }
    const counts = countByStatus(row.rsvps);
    const event = {
        id: row.id,
        title: row.title,
        description: row.description,
        location: row.location,
        eventDate: row.eventDate ? row.eventDate.toISOString() : null,
        inviteToken: row.invite?.token ?? null,
        goingCount: counts.goingCount,
        maybeCount: counts.maybeCount,
        notGoingCount: counts.notGoingCount,
    };

    const createInviteActionForEvent = createInviteLinkAction.bind(
        null,
        event.id,
    );
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
    const inviteUrl = event.inviteToken
        ? `${appUrl ?? ""}/invite/${event.inviteToken}`
        : null;
    return (<div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">{event.title}</h1>
                <p>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "no date selected"}
                    {event.location ? ` - ${event.location}` : ""}
                </p>
                {event.description && (
                    <p className="max-w-2xl text-sm text-[var(--muted-foreground)]">
                        {event.description}
                    </p>
                )}
            </div>


            <Button asChild>
                <Link href={"/dashboard"}>back</Link>
            </Button>



        </div>

        <div className="flex flex-wrap gap-2 text-xs">
            <Badge>Going: {event.goingCount}    </Badge>
            <Badge variant="secondary" >{event.maybeCount} maybe</Badge>
            <Badge variant="secondary" >{event.notGoingCount} {" "}
                not going: {event.notGoingCount}</Badge>


        </div>
        <Card>
            <CardHeader>invite link</CardHeader>
            <CardContent>
                <p>
                    Share this link with guests to they can RSVP without creating an account
                </p>

                {inviteUrl ? (
                    <div className="rounded-md border-[var(--border)] bg-[var(--surface)] p-3 text-sm">
                        {inviteUrl}
                    </div>

                ) : <p className="text-sm text-[var(--muted-foreground)]">no invite link generated yet</p>}
                <Form action={createInviteActionForEvent}>
                    <Button type="submit">generate link</Button>
                </Form>
            </CardContent>
        </Card>
    </div>
    );
}