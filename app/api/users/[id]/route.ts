import { NextResponse } from "next/server"
import { prisma } from "@/services/db"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"
import { main } from "@/services/prismaConnect"
import { randomUUID } from "crypto"
import { UserPropsInterface } from "@/type/types"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid" }, { status: 400 })
        }
        await main()

        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Success", user }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in user route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const {id} = await params

        const formData = await req.formData()

        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        await main()

        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const fullName = formData.get("fullName") as string;
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const bio = formData.get("bio") as string;
        const newImage = formData.get("avatarImage") as File | null;

        if (!fullName || !username || !email || !bio) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        const updateData: {
            fullName: string
            username: string
            email: string
            bio: string
            avatar?: string
        } = {
            fullName,
            username,
            email,
            bio,
        }

        if (newImage && newImage.size > 0) {
            if (existingUser.avatar) {
                try {
                    const oldImagePath = existingUser.avatar.split("/uploads/")[1]
                    await unlink(path.join(process.cwd(), "public", "uploads", oldImagePath))
                } catch (err) {
                    console.error("Error deleting old image:", err)
                }
            }
            try {
                const buffer = Buffer.from(await newImage.arrayBuffer())
                const fileName = `${randomUUID()}-${newImage.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
                const uploadDir = path.join(process.cwd(), "public", "uploads")

                // Create uploads directory if it doesn't exist
                await mkdir(uploadDir, { recursive: true })

                const imagePath = path.join(uploadDir, fileName)
                await writeFile(imagePath, buffer)
                updateData.avatar = `/uploads/${fileName}`
            } catch (err) {
                console.error("Image upload error:", err)
            }
        }

        await main()

        const user = await prisma.user.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ message: "User updated", user }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error in user route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const {id} = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        await main()

        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        if (user.avatar) {
            try {
                const imagePath = user.avatar.split("/uploads/")[1]

                if (imagePath) {
                    await unlink(path.join(process.cwd(), 'public', 'uploads', imagePath))
                }
            } catch (err) {
                throw new Error("Error in deleting image")
            }
        }

        await prisma.user.delete({
            where: { id }
        })
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in user route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}