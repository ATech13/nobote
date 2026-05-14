import { NextResponse } from "next/server"
import { prisma } from "@/services/db"
import { main } from "@/services/prismaConnect"

export const GET = async () => {
    try {
        await main()

        const users = await prisma.user.findMany()
        const votes = await prisma.vote.findMany({ select: { candidateId: true } })

        const voteCounts = votes.reduce<Record<string, number>>((acc, vote) => {
            acc[vote.candidateId] = (acc[vote.candidateId] || 0) + 1
            return acc
        }, {})

        const results = users
            .map((user) => ({
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                avatar: user.avatar || null,
                votesCount: voteCounts[user.id] || 0,
            }))
            .sort((a, b) => b.votesCount - a.votesCount)

        return NextResponse.json({ message: "Success", results }, { status: 200 })
    } catch (error) {
        console.error("VOTE_GET_ERROR:", error)
        const message = error instanceof Error ? error.message : "Error fetching vote results"
        return NextResponse.json({ message }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: Request) => {
    try {
        await main()

        const body = await req.json()

        const { eventId, candidateId, deviceId } = body

        // 1. Validation
        if (!eventId || !candidateId) {
            return NextResponse.json(
                { message: "eventId and candidateId are required" },
                { status: 400 }
            )
        }

        // 2. Retrieve voter IP
        const forwarded = req.headers.get("x-forwarded-for")

        const voterIp = forwarded
            ? forwarded.split(",")[0].trim()
            : "unknown"

        // 3. Check that event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        })

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            )
        }

        // 4. Check that candidate exists
        const candidate = await prisma.user.findUnique({
            where: { id: candidateId }
        })

        if (!candidate) {
            return NextResponse.json(
                { message: "Candidate not found" },
                { status: 404 }
            )
        }

        // 5. Prevent double voting (IP + device)
        const existingVote = await prisma.vote.findFirst({
            where: {
                eventId,
                candidateId,
                OR: [
                    { voterIp },
                    { deviceId }
                ]
            }
        })

        if (existingVote) {
            return NextResponse.json(
                { message: "You already voted for this candidate" },
                { status: 400 }
            )
        }

        // 6. Create vote
        const vote = await prisma.vote.create({
            data: {
                eventId,
                candidateId,
                voterIp,
                deviceId
            }
        })

        // 7. Return response
        return NextResponse.json(
            {
                message: "Vote successful",
                vote
            },
            { status: 201 }
        )

    } catch (error) {
        console.error("VOTE_ERROR:", error)

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
