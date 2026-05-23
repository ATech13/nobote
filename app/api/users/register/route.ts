import { NextResponse } from "next/server"
import { prisma } from "@/services/db"
import bcrypt from "bcrypt"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

export const POST = async (req: Request) => {
    try {

        const formData = await req.formData()

        const fullName = formData.get("fullName") as string
        const username = formData.get("username") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const bio = formData.get("bio") as string
        const eventId = formData.get("eventId") as string

        const avatar = formData.get("avatarImage")
        const imageFile = avatar instanceof File ? avatar : null

        if (
            !fullName ||
            !username ||
            !email ||
            !password ||
            !eventId
        ) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        // Vérifier event
        const existingEvent = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })

        if (!existingEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            )
        }

        // Vérifier user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10)

        // Upload image
        let avatarImage: string | null = null

        if (imageFile && imageFile.size > 0) {

            const buffer =
                Buffer.from(await imageFile.arrayBuffer())

            const fileName =
                `${randomUUID()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`

            const uploadDir =
                path.join(process.cwd(), "public", "uploads")

            await mkdir(uploadDir, {
                recursive: true
            })

            const imagePath =
                path.join(uploadDir, fileName)

            await writeFile(imagePath, buffer)

            avatarImage = `/uploads/${fileName}`
        }

        // Create user + participation
        const user = await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                password: hashedPassword,
                bio,
                avatar: avatarImage,

                participations: {
                    create: {
                        eventId
                    }
                }
            },

            select: {
                id: true,
                fullName: true,
                username: true,
                email: true,
                bio: true,
                avatar: true,

                participations: true
            }
        })

        return NextResponse.json(
            {
                message: "Registration successful",
                user
            },
            { status: 201 }
        )

    } catch (error) {

        console.log(error)

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}