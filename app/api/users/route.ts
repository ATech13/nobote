import { prisma } from "@/services/db"
import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { randomUUID } from "crypto"
import { main } from "@/services/prismaConnect"



export const GET = async () => {
    try {
        // await main();
        const users = await prisma.user.findMany()
        return NextResponse.json({ message: "Success", users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error in user route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: Request) => {
    try {

        const formData = await req.formData()
        const fullName = formData.get("fullName") as string;
        const username = formData.get("username") as string;
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const bio = formData.get("bio") as string
        const avatar = formData.get("avatarImage");
        const imageFile = avatar instanceof File ? avatar : null;

        if (!fullName || !username || !email || !password || !bio) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // await main()

        let avatarImage: string | null = null;

        if (imageFile && imageFile.size > 0) {
            try {

                const buffer = Buffer.from(await imageFile.arrayBuffer())

                const fileName = `${randomUUID()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
                const uploadDir = path.join(process.cwd(), 'public', 'uploads')

                // Create uploads directory if it doesn't exist
                await fs.promises.mkdir(uploadDir, { recursive: true })

                const imagePath = path.join(uploadDir, fileName)
                await fs.promises.writeFile(imagePath, buffer)
                avatarImage = `/uploads/${fileName}`


            } catch (err) {
                console.error("Image upload error:", err)
                avatarImage = null
            }
        }

        const user = await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                password,
                bio,
                avatar: avatarImage,
            }
        })

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 })

    } catch (err) {
        return NextResponse.json({ message: "Error in user route" }, { status: 500 })
    }
    finally {
        //await prisma.$disconnect()
    }
}