import { NextRequest, NextResponse } from "next/server";

function isServerActionPost(req: NextRequest) {
    if (req.method !== "POST") return false;
    const headers = req.headers;
    return Boolean(headers.get("Next-Action") ?? headers.get("next-action"));
}

export default async function proxy(req: NextRequest) {
    if (isServerActionPost(req)) {
        return NextResponse.next();
    }

    const { auth } = await import("@/lib/auth/server");
    return auth.middleware({ loginUrl: "/auth/sign-in" })(req);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|auth/|api/auth/).*)"],
};