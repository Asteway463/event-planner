import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
}

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
        // Build-time fallback: Prisma client without a live DB connection.
        // Queries will fail gracefully at runtime if DATABASE_URL is missing.
        return new PrismaClient() as unknown as PrismaClient
    }

    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
    })
}

let prismaInstance: PrismaClient | null = null

export const prisma = (() => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma
    try {
        prismaInstance = createPrismaClient()
    } catch {
        prismaInstance = new PrismaClient() as unknown as PrismaClient
    }
    return prismaInstance
})()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}