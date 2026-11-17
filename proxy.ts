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
    const { getAuth } = await import("@/lib/auth/server");
    const auth = await getAuth();
    return auth.middleware({ loginUrl: "/auth/sign-in" })(req);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};