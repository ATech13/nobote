import { prisma } from "@/services/db"

export async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error("Missing DATABASE_URL environment variable")
    }

    try {
        await prisma.$connect()
    } catch (err) {
        throw new Error(`Database connection error: ${err instanceof Error ? err.message : String(err)}`)
    }
}