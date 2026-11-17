"use server"

import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/server"
import { prisma } from "@/lib/prisma"

function parseCreateEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim()
    if (title.length < 3 || title.length > 200) {
        throw new Error("Title must be between 3 and 200 characters.")
    }
    const description = String(formData.get("description") ?? "").trim()
    const location = String(formData.get("location") ?? "").trim()
    const eventDate = String(formData.get("eventDate") ?? "").trim()
    const isPublic = String(formData.get("isPublic") ?? "on") === "on"

    return {
        title,
        description: description.length ? description.slice(0, 2000) : null,
        location: location.length ? location.slice(0, 200) : null,
        eventDate: eventDate.length ? new Date(eventDate) : null,
        isPublic,
    }
}

export type CreateEventState = {
    error?: string
}

export async function createEventAction(
    _previousState: CreateEventState,
    formData: FormData,
): Promise<CreateEventState> {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    let input: ReturnType<typeof parseCreateEvent>
    try {
        input = parseCreateEvent(formData)
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        }
        throw error
    }

    const created = await prisma.event.create({
        data: {
            ownerUserId: userId,
            title: input.title,
            description: input.description,
            location: input.location,
            eventDate: input.eventDate,
            isPublic: input.isPublic,
        },
    })

    redirect(`/events/${created.id}`)
}

export async function updateEventAction(
    eventId: string,
    _previousState: { error?: string },
    formData: FormData,
): Promise<{ error?: string }> {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    const owns = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    })
    if (!owns) {
        return { error: "You do not own this event." }
    }

    const title = String(formData.get("title") ?? "").trim()
    if (title.length < 3 || title.length > 200) {
        return { error: "Title must be between 3 and 200 characters." }
    }

    const description = String(formData.get("description") ?? "").trim()
    const location = String(formData.get("location") ?? "").trim()
    const eventDate = String(formData.get("eventDate") ?? "").trim()
    const isPublic = String(formData.get("isPublic") ?? "on") === "on"

    await prisma.event.update({
        where: { id: eventId },
        data: {
            title,
            description: description.length ? description.slice(0, 2000) : null,
            location: location.length ? location.slice(0, 200) : null,
            eventDate: eventDate.length ? new Date(eventDate) : null,
            isPublic,
        },
    })

    redirect(`/events/${eventId}`)
}

export async function deleteEventAction(eventId: string) {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    const owns = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    })
    if (!owns) {
        throw new Error("You do not own this event.")
    }

    await prisma.event.delete({ where: { id: eventId } })
    redirect("/dashboard")
}

export async function createInviteLinkAction(eventId: string) {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    const owns = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    })
    if (!owns) {
        throw new Error("Event not found or you do not own it.")
    }

    const token = crypto.randomUUID().replace(/-/g, "")
    await prisma.eventInvite.upsert({
        where: { eventId: owns.id },
        create: { eventId: owns.id, token },
        update: { token },
    })
    redirect(`/events/${eventId}`)
}

export async function deleteInviteLinkAction(eventId: string) {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    await prisma.eventInvite.deleteMany({ where: { eventId } })
    redirect(`/events/${eventId}`)
}

export async function submitRsvpForToken(formData: FormData) {
    const token = String(formData.get("token") ?? "").trim()
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const status = String(formData.get("status") ?? "")

    if (!token || !name || !["GOING", "MAYBE", "NOT_GOING"].includes(status)) {
        throw new Error("Invalid RSVP details.")
    }

    const invite = await prisma.eventInvite.findUnique({
        where: { token },
        select: { id: true, eventId: true },
    })
    if (!invite) {
        throw new Error("Invite not found.")
    }

    await prisma.eventRsvp.upsert({
        where: {
            eventId_emailNormalized: {
                eventId: invite.eventId,
                emailNormalized: email.toLowerCase(),
            },
        },
        create: {
            eventId: invite.eventId,
            inviteId: invite.id,
            name,
            email,
            emailNormalized: email.toLowerCase(),
            status: status as "GOING" | "MAYBE" | "NOT_GOING",
        },
        update: {
            name,
            email,
            inviteId: invite.id,
            status: status as "GOING" | "MAYBE" | "NOT_GOING",
            respondedAt: new Date(),
        },
    })

    redirect(`/invite/${token}?submitted=1`)
}

export async function submitRsvpAuthenticated(
    eventId: string,
    formData: FormData,
) {
    const session = await getSession()
    const userId = session.data?.user.id
    if (!userId) {
        redirect("/auth/sign-in")
    }

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const status = String(formData.get("status") ?? "")

    if (!name || !email || !["GOING", "MAYBE", "NOT_GOING"].includes(status)) {
        throw new Error("Invalid RSVP details.")
    }

    const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { id: true, ownerUserId: true },
    })
    if (!event) {
        throw new Error("Event not found.")
    }

    await prisma.eventRsvp.upsert({
        where: {
            eventId_emailNormalized: {
                eventId,
                emailNormalized: email.toLowerCase(),
            },
        },
        create: {
            eventId,
            userId,
            name,
            email,
            emailNormalized: email.toLowerCase(),
            status: status as "GOING" | "MAYBE" | "NOT_GOING",
        },
        update: {
            name,
            email,
            userId,
            status: status as "GOING" | "MAYBE" | "NOT_GOING",
            respondedAt: new Date(),
        },
    })

    redirect(`/events/${eventId}?rsvp=submitted`)
}