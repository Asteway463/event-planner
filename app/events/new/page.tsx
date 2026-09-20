import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";


export default async function NewEventPage() {
    return (<div className="mx-auto w-full max-w-2xl py-8">
        <Card>
            <CardHeader>
                <CardTitle>create Event</CardTitle>
            </CardHeader>
            <CardContent>
                <Form action={createEventAction}>
                    <FormField>
                        <Label> title </Label>
                        <Input id="title" name="title" required placeholder="write event name"></Input>
                        <Label htmlFor="description">description</Label>
                        <Textarea id="description" name="description" placeholder="optional details about this event"></Textarea>
                    </FormField>

                    <FormField>
                        <Label htmlFor="location"> location </Label>
                        <Input id="location" name="location" placeholder="where is it happening?"></Input>
                    </FormField>

                    <FormField>
                        <Label> date and time </Label>
                        <Input id="eventDate" name="eventDate" type="datetime-local"></Input>
                        <FormMessage>optional, u can set this later.</FormMessage>

                        <div className="flex items-center gap-3">
                            <Button type="submit">create event</Button>
                            <Button type="button" variant="outline">
                                <Link href={"/dashboard"}> cancel </Link>
                            </Button>
                        </div>
                    </FormField>
                </Form>
            </CardContent>
        </Card>
    </div>)
}