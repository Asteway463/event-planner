import type { NextRequest } from "next/server";

type AuthRouteContext = { params: Promise<{ path: string[] }> };

async function getAuthHandler() {
    const { getAuth } = await import("@/lib/auth/server");
    const auth = await getAuth();
    return auth.handler();
}

export async function GET(request: NextRequest, context: AuthRouteContext) {
    const handler = await getAuthHandler();
    return handler.GET(request, context);
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
    const handler = await getAuthHandler();
    return handler.POST(request, context);
}

export async function PUT(request: NextRequest, context: AuthRouteContext) {
    const handler = await getAuthHandler();
    return handler.PUT(request, context);
}

export async function PATCH(request: NextRequest, context: AuthRouteContext) {
    const handler = await getAuthHandler();
    return handler.PATCH(request, context);
}

export async function DELETE(request: NextRequest, context: AuthRouteContext) {
    const handler = await getAuthHandler();
    return handler.DELETE(request, context);
}