import { NextResponse } from "next/server"
import { prisma } from "@/services/db"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ message: "Invalid" }, { status: 400 })
        }

        const event = await prisma.event.findUnique({
            where: {
                id
            },
            include: {
                users: true
            }
        })

        const user = await prisma.user.findUnique({
            where: {
                id,
                eventId: event?.id

            },
        })

        const votes = await prisma.vote.findMany({
            where: { eventId: event?.id },
            select: { candidateId: true }
        })

        const voteCounts = votes.reduce<Record<string, number>>((acc, vote) => {
            acc[vote.candidateId] = (acc[vote.candidateId] || 0) + 1
            return acc
        }, {})

        const results = event?.users
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
    }
}

    //     // récupérer les votes de cet événement
    //     const votes = await prisma.vote.findMany({
    //         where: {
    //             eventId: id
    //         },
    //         select: {
    //             candidateId: true
    //         }
    //     })

    //     // compter les votes
    //     const voteCounts = votes.reduce<Record<string, number>>(
    //         (acc, vote) => {

    //             acc[vote.candidateId] =
    //                 (acc[vote.candidateId] || 0) + 1

    //             return acc

    //         },
    //         {}
    //     )

    //     // construire les résultats
    //     const results = event?.users
    //         .map((user) => ({
    //             id: user.id,
    //             fullName: user.fullName,
    //             username: user.username,
    //             avatar: user.avatar || null,
    //             votesCount: voteCounts[user.id] || 0,
    //         }))
    //         .sort((a, b) => b.votesCount - a.votesCount)

    //     return NextResponse.json(
    //         {
    //             message: "Success",
    //             results
    //         },
    //         { status: 200 }
    // )
// } catch (err) {
//     return NextResponse.json({ message: "Error in user route" }, { status: 500 })
// }


// export const POST = async (
//     req: Request,
//     { params }: { params: { id: string } }
// ) => {

//     try {

//         const { id } = await params

//         const body = await req.json()

//         const { candidateId, deviceId } = body

//         if (!candidateId) {
//             return NextResponse.json(
//                 { message: "candidateId is required" },
//                 { status: 400 }
//             )
//         }

//         // IP du votant
//         const forwarded = req.headers.get("x-forwarded-for")

//         const voterIp = forwarded
//             ? forwarded.split(",")[0].trim()
//             : "unknown"

//         // vérifier event
//         const event = await prisma.event.findUnique({
//             where: {
//                 id
//             }
//         })

//         if (!event) {
//             return NextResponse.json(
//                 { message: "Event not found" },
//                 { status: 404 }
//             )
//         }

//         // vérifier candidate
//         const candidate = await prisma.user.findUnique({
//             where: {
//                 id: candidateId
//             }
//         })

//         if (!candidate) {
//             return NextResponse.json(
//                 { message: "Candidate not found" },
//                 { status: 404 }
//             )
//         }

//         // empêcher double vote
//         const existingVote = await prisma.vote.findFirst({
//             where: {
//                 eventId: id,
//                 candidateId,
//                 OR: [
//                     { voterIp },
//                     { deviceId }
//                 ]
//             }
//         })

//         if (existingVote) {
//             return NextResponse.json(
//                 { message: "Already voted" },
//                 { status: 400 }
//             )
//         }

//         // créer vote
//         const vote = await prisma.vote.create({
//             data: {
//                 eventId: id,
//                 candidateId,
//                 voterIp,
//                 deviceId
//             }
//         })

//         return NextResponse.json(
//             {
//                 message: "Vote successful",
//                 vote
//             },
//             { status: 201 }
//         )

//     } catch (error) {

//         console.error("VOTE_POST_ERROR:", error)

//         return NextResponse.json(
//             { message: "Internal server error" },
//             { status: 500 }
//         )
//     }
// }