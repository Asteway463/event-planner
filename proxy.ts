import { NextRequest, NextResponse } from "next/server";

function isServerActionPost(req: NextRequest) {
    if (req.method !== "POST") return false;
    const headers = req.headers;
    return Boolean(headers.get("Next-Action") ?? headers.get("next-action"));
}

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow root landing page
    if (pathname === "/") {
        return NextResponse.next();
    }

    // Allow server actions (POST with Next-Action header)
    if (isServerActionPost(req)) {
        return NextResponse.next();
    }

    // Public routes that don't require auth
    if (
        pathname.startsWith("/auth") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/invite")
    ) {
        return NextResponse.next();
    }

    // Protected routes: require authentication via Neon Auth middleware
    try {
        const { getAuth } = await import("@/lib/auth/server");
        const auth = await getAuth();
        return auth.middleware({ loginUrl: "/auth/sign-in" })(req);
    } catch {
        // Auth not configured — allow request through (will be handled by client-side redirects)
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};