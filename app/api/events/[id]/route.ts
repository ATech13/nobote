import { NextResponse } from "next/server"
import { prisma } from "@/services/db"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"
import { main } from "@/services/prismaConnect"
import { randomUUID } from "crypto"
import { EventFormDataInterface } from "@/type/types"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid" }, { status: 400 })
        }
        await main()

        const event = await prisma.event.findUnique({
            where: { id }
        })

        if (!event) {
            return NextResponse.json({ message: "Event not fount" }, { status: 404 })
        }
        return NextResponse.json({ message: "Success", event }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const formData = await req.formData()

        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id }
        })

        if (!existingEvent) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const startDateStr = formData.get("startDate") as string
        const endDateStr = formData.get("endDate") as string
        const newImage = formData.get("coverImage") as File | null;

        if (!title || !description || !startDateStr || !endDateStr) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // Convert date strings (YYYY-MM-DD) to ISO 8601 DateTime format
        const startDate = new Date(`${startDateStr}T00:00:00Z`)
        const endDate = new Date(`${endDateStr}T23:59:59Z`)

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json({ message: "Invalid date format" }, { status: 400 })
        }

        const updateData: EventFormDataInterface = {
            title,
            description,
            startDate,
            endDate,
        }

        if (newImage) {
            if (existingEvent.coverImage) {
                try {
                    const oldImagePath = existingEvent.coverImage.split("/uploads/")[1]
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
                updateData.coverImage = `/uploads/${fileName}`
            } catch (err) {
                console.error("Image upload error:", err)
            }
        }

        await main()

        const event = await prisma.event.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ message: "Event updated", event }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const formData = await req.formData()

        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id }
        })

        if (!existingEvent) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const startDateStr = formData.get("startDate") as string
        const endDateStr = formData.get("endDate") as string
        const newImage = formData.get("coverImage") as File | null;

        if (!title || !description || !startDateStr || !endDateStr) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        const startDate = new Date(`${startDateStr}T00:00:00Z`)
        const endDate = new Date(`${endDateStr}T23:59:59Z`)

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json({ message: "Invalid date format" }, { status: 400 })
        }

        const updateData: EventFormDataInterface = {
            title,
            description,
            startDate,
            endDate,
        }

        if (newImage) {
            if (existingEvent.coverImage) {
                try {
                    const oldImagePath = existingEvent.coverImage.split("/uploads/")[1]
                    await unlink(path.join(process.cwd(), "public", "uploads", oldImagePath))
                } catch (err) {
                    console.error("Error deleting old image:", err)
                }
            }
            try {
                const buffer = Buffer.from(await newImage.arrayBuffer())
                const fileName = `${randomUUID()}-${newImage.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
                const uploadDir = path.join(process.cwd(), "public", "uploads")

                await mkdir(uploadDir, { recursive: true })

                const imagePath = path.join(uploadDir, fileName)
                await writeFile(imagePath, buffer)
                updateData.coverImage = `/uploads/${fileName}`
            } catch (err) {
                console.error("Image upload error:", err)
            }
        }

        await main()

        const event = await prisma.event.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ message: "Event updated", event }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        await main()

        const event = await prisma.event.findUnique({
            where: { id }
        })

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }

        if (event.coverImage) {
            try {
                const imagePath = event.coverImage.split("/uploads/")[1]

                if (imagePath) {
                    await unlink(path.join(process.cwd(), 'public', 'uploads', imagePath))
                }
            } catch (err) {
                throw new Error("Error in deleting image")
            }
        }

        await prisma.event.delete({
            where: { id }
        })
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}