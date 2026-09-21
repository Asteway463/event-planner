import { createNeonAuth } from "@neondatabase/auth/next/server";

function getAuthConfig() {
    const baseUrl = process.env.NEON_AUTH_BASE_URL;
    const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

    if (!baseUrl || !cookieSecret) {
        throw new Error(
            "Missing NEON_AUTH_BASE_URL or NEON_AUTH_COOKIE_SECRET. Add both variables to the deployment environment.",
        );
    }

    return {
        baseUrl,
        cookies: { secret: cookieSecret },
    };
}

export function getAuth() {
    return createNeonAuth(getAuthConfig());
}


export function getSession() {
    return getAuth().getSession();
}