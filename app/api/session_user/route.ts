import { prisma } from "@/services/db"
import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { UserRange } from "@prisma/client"

export const GET = async () => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { message: "Utilisateur non authentifié" },
                { status: 401 }
            )
        }

        const user = await prisma.authUser.findUnique({
            where: {
                clerkId: userId
            },
            include: {
                events: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { message: "Utilisateur non trouvé" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Success", user },
            { status: 200 }
        )

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Error in authentificated user route" },
            { status: 500 }
        )
    }
}



export const POST = async () => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { message: "Id de l'utilisateur non authentifié introuvable" },
                { status: 401 }
            )
        }

        const clerkUser = await currentUser()

        if (!clerkUser) {
            return NextResponse.json(
                { message: "Clerk user not found" },
                { status: 404 }
            )
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress

        if (!email) {
            return NextResponse.json(
                { message: "Email not found" },
                { status: 400 }
            )
        }
        const existingUser = await prisma.authUser.findUnique({
            where: { email }
        })


        const username =
            `@${clerkUser.firstName ?? ""}_${clerkUser.lastName ?? ""}`.trim().toLowerCase()
        let rang: UserRange = "D"
        if (!existingUser) {
            if (
                clerkUser.primaryEmailAddress?.emailAddress === "rartheophile@gmail.com" ||
                clerkUser.primaryEmailAddress?.emailAddress === "theophilerar@gmail.com" ||
                clerkUser.primaryEmailAddress?.emailAddress === "testzone133@gmail.com" ||
                clerkUser.primaryEmailAddress?.emailAddress === "lumooaaron@gmail.com" ||
                clerkUser.primaryEmailAddress?.emailAddress === "henryndoole@gmail.com" ||
                clerkUser.primaryEmailAddress?.emailAddress === "nathamoon3@gmail.com"
            ) {
                rang = "NATION"
            }
            const user = await prisma.authUser.create({
                data: {
                    clerkId: userId,
                    username: username,
                    email: email,
                    rang: rang,
                    isActive: false,
                    fullName: clerkUser.fullName ?? `utilisateur_${userId}`
                }
            })
            return NextResponse.json(
                { message: "User created successfully", user },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { message: "Utilisateur déjà présent dans la base de données", existingUser },
                { status: 200 }
            )
        }


    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Error in user route" },
            { status: 500 }
        )
    }
}
