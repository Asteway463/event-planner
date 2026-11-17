import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                    <Home className="size-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The page you're looking for doesn't exist.
                </p>
                <div className="mt-8">
                    <Button asChild>
                        <Link href="/">Go home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}