import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateEventForm } from "./create-event-form";


export default async function NewEventPage() {
    return (<div className="mx-auto w-full max-w-2xl py-8">
        <Card>
            <CardHeader>
                <CardTitle>Create event</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateEventForm />
            </CardContent>
        </Card>
    </div>)
}