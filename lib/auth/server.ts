async function getAuthConfig() {
    const baseUrl = process.env.NEON_AUTH_BASE_URL;
    const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

    // During build/static generation, auth env vars may not be available.
    // Return null gracefully so the build doesn't crash.
    if (!baseUrl || !cookieSecret) {
        return null;
    }

    return {
        baseUrl,
        cookies: { secret: cookieSecret },
    };
}

let cachedAuth: Awaited<ReturnType<typeof import("@neondatabase/auth/next/server").createNeonAuth>> | null = null;
let authError: Error | null = null;

async function getAuth() {
    if (cachedAuth) return cachedAuth;
    if (authError) throw authError;

    const config = await getAuthConfig();
    if (!config) {
        authError = new Error("Neon Auth not configured");
        throw authError;
    }

    try {
        const { createNeonAuth } = await import("@neondatabase/auth/next/server");
        cachedAuth = createNeonAuth(config);
        return cachedAuth;
    } catch (err) {
        authError = err as Error;
        throw authError;
    }
}

export { getAuth };

export async function getSession() {
    try {
        const auth = await getAuth();
        return await auth.getSession();
    } catch {
        // Auth not configured or unavailable — return empty session
        return { data: { user: null } };
    }
}