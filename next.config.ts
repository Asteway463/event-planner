import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    // Ensure we use webpack (not Turbopack) for maximum compatibility
    // Vercel's Next.js build uses webpack by default
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
    // Externalize heavy packages that can cause build issues
    serverExternalPackages: ["@neondatabase/auth"],
    // Ensure proper trailing slash handling
    trailingSlash: false,
}

export default nextConfig