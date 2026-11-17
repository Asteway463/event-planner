"use client"

import { useActionState } from "react"
import Link from "next/link"
import { createEventAction } from "@/lib/actions/events"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MessageCircle, MapPin } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function CreateEventForm() {
    const [state, formAction, pending] = useActionState(createEventAction, {})

    return (
        <Form action={formAction} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <FormField
                    className={cn("col-span-2", state.error ? "" : "")}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="title">Event title</Label>
                            <span className="text-xs font-medium text-destructive">*</span>
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
                            <Input
                                id="title"
                                name="title"
                                required
                                minLength={3}
                                maxLength={200}
                                placeholder="e.g. Summer BBQ at the Park"
                                className="pl-10"
                            />
                        </div>
                        {state.error && (
                            <p className="text-sm text-destructive" role="alert" aria-live="polite">
                                {state.error}
                            </p>
                        )}
                    </div>
                </FormField>

                <FormField>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <div className="relative">
                            <MessageCircle className="absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="What’s this event about? Add details your guests should know."
                                className="pl-10"
                            />
                        </div>
                    </div>
                </FormField>

                <FormField>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="location">Location</Label>
                            <span className="text-xs font-medium text-muted-foreground">Optional</span>
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g. Central Park, Pavilion 3"
                                className="pl-10"
                            />
                        </div>
                    </div>
                </FormField>

                <FormField>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="eventDate">Date and time</Label>
                            <span className="text-xs font-medium text-muted-foreground">Optional</span>
                        </div>
                        <Input
                            id="eventDate"
                            name="eventDate"
                            type="datetime-local"
                            className="h-10 rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                        />
                    </div>
                </FormField>
            </div>

            <FormField>
                <div className="flex items-center gap-3">
                    <Checkbox
                        id="isPublic"
                        name="isPublic"
                        defaultChecked
                        className="text-violet-600"
                    />
                    <Label htmlFor="isPublic" className="text-sm font-medium text-foreground">
                        Public event (anyone with the link can RSVP)
                    </Label>
                </div>
            </FormField>

            <div className="pt-4 flex items-center gap-3">
                <Button type="submit" disabled={pending} className="w-auto">
                    {pending ? "Creating event…" : "Create event"}
                </Button>
                <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard">Cancel</Link>
                </Button>
            </div>
        </Form>
    )
}