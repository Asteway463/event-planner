import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateEventForm } from "./create-event-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "@/components/icons"

export const dynamic = "force-dynamic"

export default async function NewEventPage() {
    return (
        <div className="mx-auto w-full max-w-4xl py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create new event</h1>
                    <p className="text-sm text-muted-foreground">
                        Set the details, then share your invite link with guests.
                    </p>
                </div>
                <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                        <Calendar className="size-4 mr-2" aria-hidden="true" />
                        Back to dashboard
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="size-5 text-violet-600" aria-hidden="true" />
                        Event details
                    </CardTitle>
                    <CardDescription>
                        Fill in the basics below. You can always edit these later from your dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateEventForm />
                </CardContent>
            </Card>
        </div>
    )
}