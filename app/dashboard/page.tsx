import { DashboardContent } from "@/components/dashboard-content"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
    let session
    try {
        session = await getSession()
    } catch {
        session = { data: { user: null } }
    }

    // Only redirect when auth is configured and user is not signed in
    if (
        process.env.NEON_AUTH_BASE_URL &&
        process.env.NEON_AUTH_COOKIE_SECRET &&
        !session.data?.user
    ) {
        redirect("/auth/sign-in")
    }

    return (
        <DashboardContent
            userId={session.data?.user?.id ?? ""}
            user={session.data?.user ?? {}}
        />
    )
}