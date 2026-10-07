"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateEventForm() {
    const [state, formAction, pending] = useActionState(createEventAction, {});

    return (
        <Form action={formAction}>
            <FormField>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    required
                    minLength={3}
                    maxLength={120}
                    placeholder="Write event name"
                />
                {state.error ? (
                    <p className="text-sm text-destructive" role="alert" aria-live="polite">
                        {state.error}
                    </p>
                ) : null}
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Optional details about this event"
                />
            </FormField>

            <FormField>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Where is it happening?" />
            </FormField>

            <FormField>
                <Label htmlFor="eventDate">Date and time</Label>
                <Input id="eventDate" name="eventDate" type="datetime-local" />
                <p className="text-sm text-muted-foreground">Optional, you can set this later.</p>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={pending}>
                        {pending ? "Creating..." : "Create event"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                </div>
            </FormField>
        </Form>
    );
}