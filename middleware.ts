import { NextRequest, NextResponse } from "next/server";

function isServerActionPost(req: NextRequest) {
    if (req.method !== "POST") return false;
    const h = req.headers;
    return Boolean(h.get("Next-Action") ?? h.get("next-action"));
}

export default async function middleware(req: NextRequest) {
    if (isServerActionPost(req)) {
        return NextResponse.next();
    }

    const { auth } = await import("@/lib/auth/server");
    return auth.middleware({ loginUrl: "/auth/sign-in" })(req);
}

export const config = {
    matcher: [

        "/((?!_next/static|_next/image|favicon.ico|auth/|api/auth/).*)",
    ],
};
