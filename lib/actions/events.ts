"use server"

import { redirect } from "next/navigation";
import { getSession } from "../auth/server"
import { prisma } from "../prisma";

function parseCreateEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    if (title.length < 3 || title.length > 120) {
        throw new Error("Title must be between 3 and 120 characters.");
    }
    const description = String(formData.get("description") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const eventDate = String(formData.get("eventDate") ?? "").trim();
    return {
        title,
        description: description.length ? description.slice(0, 2000) : null,
        location: location.length ? location.slice(0, 200) : null,
        eventDate: eventDate.length ? eventDate : null,
    };
}

export async function createEventAction(formData: FormData) {
    const session = await getSession();
    const userId = session.data?.user.id;
    if (!userId) {
        redirect("/auth/sign-in");
    }
    const input = parseCreateEvent(formData);

    try {
        const created = await prisma.event.create({
            data: {
                ownerUserId: userId,
                title: input.title,
                description: input.description,
                location: input.location,
                eventDate: input.eventDate ? new Date(input.eventDate) : null,
            },
        });

        redirect(`/events/new/${created.id}`);
    } catch (error) {
        // Handle error or rethrow if it's a NEXT_REDIRECT error
        throw error;
    }
}

export async function createInviteLinkAction(eventId: string) {
    const session = await getSession();
    const userId = session.data?.user.id;
    if (!userId) {
        redirect("/auth/sign-in");
    }

    const owns = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    })
    if (!owns) {
        throw new Error("eventNotFound")
    }
    const token = crypto.randomUUID().replace(/-/g, "");
    await prisma.eventInvite.upsert({
        where: { eventId: owns.id },
        create: { eventId: owns.id, token },
        update: { token },
    });
    redirect(`/events/new/${eventId}`);
}

export async function submitRsvpForToken(formData: FormData) {
    const token = String(formData.get("token") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const status = String(formData.get("status") ?? "");

    if (!token || !name || !["going", "maybe", "not_going"].includes(status)) {
        throw new Error("Invalid RSVP details.");
    }

    const invite = await prisma.eventInvite.findUnique({
        where: { token },
        select: { id: true, eventId: true },
    });
    if (!invite) {
        throw new Error("Invite not found.");
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
            status: status as "going" | "maybe" | "not_going",
        },
        update: {
            name,
            email,
            inviteId: invite.id,
            status: status as "going" | "maybe" | "not_going",
            respondedAt: new Date(),
        },
    });

    redirect(`/invite/${token}?submitted=1`);
}