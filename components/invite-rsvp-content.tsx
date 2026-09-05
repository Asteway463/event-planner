import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { submitRsvpForToken } from "@/lib/actions/events";


export async function InviteRsvpContent({
    token,
    submitted,
}: {
    token: string;
    submitted: boolean;
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
                },
            },
        },
    });

    if (!row) {
        notFound();
    }
    const e = row.event;
    const event = {
        title: e.title,
        description: e.description,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        location: e.location,
    };
    return (<div className="flex flex-1 flex-col gap-6">
        <Card>
            <CardHeader className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                    RSVP
                </Badge>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-[var(--muted-foreground)]">
                    {event.eventDate
                        ? new Date(event.eventDate).toLocaleString()
                        : "No date selected"}
                    {event.location ? ` - ${event.location}` : ""}
                </p>
                {event.description ? (
                    <p className="text-sm text-[var(--muted-foreground)]">
                        {event.description}
                    </p>
                ) : null}
            </CardHeader>
            <CardContent>
                {submitted ? <p>Your response has been recorded.</p> : (
                    <Form action={submitRsvpForToken}>
                        <input type="hidden" name="token" value={token} />
                        <FormField>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required placeholder="Your name" />
                            <Label htmlFor="email">Email (optional)</Label>
                            <Input id="email" name="email" type="email" placeholder="Your email" />
                            <Label htmlFor="status">Response</Label>
                            <select id="status" name="status" defaultValue="going" className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
                                <option value="going">Going</option>
                                <option value="maybe">Maybe</option>
                                <option value="not_going">Not going</option>
                            </select>
                        </FormField>
                        <Button type="submit">Submit RSVP</Button>
                    </Form>
                )}
            </CardContent>
        </Card>
    </div>
    );
}





