import { PrismaClient } from "@/app/generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
}

// Mock PrismaClient for build-time when DATABASE_URL is not available.
// All methods return empty results so static generation doesn't crash.
const createMockPrisma = (): PrismaClient => {
    const emptyResult = () => null
    const emptyList = () => []
    const mock = {
        event: {
            findMany: emptyList,
            findFirst: emptyResult,
            findUnique: emptyResult,
            create: emptyResult,
            update: emptyResult,
            delete: emptyResult,
        },
        eventInvite: {
            findUnique: emptyResult,
            findFirst: emptyResult,
            upsert: emptyResult,
            deleteMany: emptyResult,
        },
        eventRsvp: {
            upsert: emptyResult,
        },
        user: {
            findUnique: emptyResult,
            findFirst: emptyResult,
        },
        account: {
            findFirst: emptyResult,
            findUnique: emptyResult,
        },
        session: {
            findFirst: emptyResult,
            findUnique: emptyResult,
        },
        verificationToken: {
            findFirst: emptyResult,
            findUnique: emptyResult,
        },
        $connect: async () => {},
        $disconnect: async () => {},
        $transaction: async (fn: any) => fn(mock),
    } as unknown as PrismaClient
    return mock
}

let prismaInstance: PrismaClient | null = null

export const prisma = (() => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    const connectionString = process.env.DATABASE_URL

    try {
        if (connectionString) {
            const { PrismaPg } = require("@prisma/adapter-pg")
            const { Pool } = require("pg")
            const pool = new Pool({ connectionString })
            const adapter = new PrismaPg(pool)
            prismaInstance = new PrismaClient({
                adapter,
                log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
            })
        } else {
            prismaInstance = createMockPrisma()
        }
    } catch {
        prismaInstance = createMockPrisma()
    }

    return prismaInstance
})()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}