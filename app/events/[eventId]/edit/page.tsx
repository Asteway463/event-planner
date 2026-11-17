"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MessageCircle, MapPin, ArrowLeft } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { updateEventAction } from "@/lib/actions/events"

type EventData = {
    id: string
    title: string
    description: string | null
    location: string | null
    eventDate: string | null
    isPublic: boolean
}

type EditEventProps = {
    event: EventData
}

export default function EditEventPage({ event }: EditEventProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<{
        title: string
        description: string
        location: string
        eventDate: string
        isPublic: string
    }>({
        defaultValues: {
            title: event.title,
            description: event.description ?? "",
            location: event.location ?? "",
            eventDate: event.eventDate ?? "",
            isPublic: event.isPublic ? "on" : "off",
        },
    })

    const onSubmit = async (data: {
        title: string
        description: string
        location: string
        eventDate: string
        isPublic: string
    }) => {
        setIsLoading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("location", data.location)
            formData.append("eventDate", data.eventDate)
            formData.append("isPublic", data.isPublic)

            await updateEventAction(event.id, {}, formData)
        } catch (err: any) {
            setError(err?.message || "Failed to update event")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-2xl py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit event</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the details below. Changes are saved immediately.
                    </p>
                </div>
                <Link href={`/events/${event.id}`}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="size-4 mr-2" aria-hidden="true" />
                        Back to event
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Event details</CardTitle>
                    <CardDescription>
                        Make changes to your event. Guests will see the updated information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="title">Event title</Label>
                                    <Input
                                        id="title"
                                        {...register("title", {
                                            required: "Title is required",
                                            minLength: { value: 3, message: "Title must be at least 3 characters" },
                                            maxLength: { value: 200, message: "Title must be at most 200 characters" },
                                        })}
                                        required
                                        className={cn(
                                            "h-10 rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
                                            errors.title && "border-destructive focus-visible:ring-destructive"
                                        )}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title.message}</p>
                                    )}
                                </div>
                            </FormField>

                            <FormField>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        {...register("description")}
                                        placeholder="What’s this event about?"
                                    />
                                </div>
                            </FormField>

                            <FormField>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        {...register("location")}
                                        placeholder="e.g. Central Park"
                                    />
                                </div>
                            </FormField>

                            <FormField>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="eventDate">Date and time</Label>
                                    <Input
                                        id="eventDate"
                                        {...register("eventDate")}
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
                                    {...register("isPublic")}
                                    defaultChecked={event.isPublic}
                                    className="text-violet-600"
                                />
                                <Label htmlFor="isPublic" className="text-sm font-medium text-foreground">
                                    Public event (anyone with the link can RSVP)
                                </Label>
                            </div>
                        </FormField>

                        {error && (
                            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                                <span role="alert" aria-live="polite">{error}</span>
                            </div>
                        )}

                        <div className="pt-4 flex items-center gap-3">
                            <Button type="submit" disabled={isLoading} className="w-auto">
                                {isLoading ? "Saving…" : "Save changes"}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href={`/events/${event.id}`}>Cancel</Link>
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}