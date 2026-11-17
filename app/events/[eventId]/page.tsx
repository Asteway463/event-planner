import { EventDetailContent } from "@/components/event-detail-content"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EventDetailsPage({
    params,
}: {
    params: Promise<{ eventId: string }>
}) {
    const { eventId } = await params
    let session
    try {
        session = await getSession()
    } catch {
        session = { data: { user: null } }
    }

    if (
        process.env.NEON_AUTH_BASE_URL &&
        process.env.NEON_AUTH_COOKIE_SECRET &&
        !session.data?.user
    ) {
        redirect("/auth/sign-in")
    }

    return (
        <EventDetailContent
            userId={session.data?.user?.id ?? ""}
            eventId={eventId}
            user={session.data?.user ?? {}}
        />
    )
}