import { DashboardContent } from "@/components/dashboard-content"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
    const session = await getSession()
    if (!session.data?.user) {
        redirect("/auth/sign-in")
    }

    return (
        <DashboardContent userId={session.data.user.id} user={session.data.user} />
    )
}