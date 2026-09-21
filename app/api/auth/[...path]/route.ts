import { getAuth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

type AuthRouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: AuthRouteContext) {
	return getAuth().handler().GET(request, context);
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
	return getAuth().handler().POST(request, context);
}

export async function PUT(request: NextRequest, context: AuthRouteContext) {
	return getAuth().handler().PUT(request, context);
}

export async function PATCH(request: NextRequest, context: AuthRouteContext) {
	return getAuth().handler().PATCH(request, context);
}

export async function DELETE(request: NextRequest, context: AuthRouteContext) {
	return getAuth().handler().DELETE(request, context);
}