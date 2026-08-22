import { prisma } from "@/services/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { message: "Non authentifié" },
                { status: 401 }
            )
        }

        const user = await prisma.authUser.findUnique({
            where: {
                clerkId: userId,
            },
            select: {
                theme: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { message: "Utilisateur introuvable" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            theme: user.theme,
        })
    } catch (error) {
        console.error("Theme GET error:", error)

        return NextResponse.json(
            { message: "Erreur lors de la récupération du thème" },
            { status: 500 }
        )
    }
}


export const PATCH = async (req: Request) => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { message: "Non authentifié" },
                { status: 401 }
            )
        }

        const { theme } = await req.json()

        if (theme !== "light" && theme !== "sunset") {
            return NextResponse.json(
                { message: "Thème invalide" },
                { status: 400 }
            )
        }

        const user = await prisma.authUser.findUnique({
            where: {
                clerkId: userId,
            },
        })

        if (!user) {
            return NextResponse.json(
                { message: "Utilisateur introuvable" },
                { status: 404 }
            )
        }

        const updatedUser = await prisma.authUser.update({
            where: {
                id: user.id,
            },
            data: {
                theme,
            },
        })

        return NextResponse.json({
            message: "Thème mis à jour",
            theme: updatedUser.theme,
        })
    } catch (error) {
        console.error("Theme update error:", error)

        return NextResponse.json(
            { message: "Erreur lors de la mise à jour du thème" },
            { status: 500 }
        )
    }
}