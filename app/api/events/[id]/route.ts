import { NextResponse } from "next/server"
import { prisma } from "@/services/db"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"
import { main } from "@/services/prismaConnect"
import { randomUUID } from "crypto"
import { EventFormDataInterface, StatusType } from "@/type/types"
import imagekit from "@/lib/imagekit"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid" }, { status: 400 })
        }
        // await main()

        const event = await prisma.event.findUnique({
            where: { id: id },
            include: {
                users: true,
                comments: true
            }
        })

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Success", event }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    }
    // finally {
    //     await prisma.$disconnect()
    // }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const formData = await req.formData()

        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id: id },
            include: {
                users: true,
                comments: true,
            }
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

        // await main()

        const event = await prisma.event.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ message: "Event updated", event }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    }
    // finally {
    //     await prisma.$disconnect()
    // }
}

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        const formData = await req.formData()

        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id: id },
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

        // await main()

        const event = await prisma.event.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ message: "Event updated", event }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        // await prisma.$disconnect()
    }
}

// export const PATCH = async (
//     req: Request,
//     { params }: { params: { id: string } }
// ) => {
//     try {
//         const { id } = await params

//         if (!id) {
//             return NextResponse.json(
//                 { message: "Invalid id" },
//                 { status: 400 }
//             )
//         }

//         const status = await req.text()

//         const allowedStatuses = [
//             "DISABLED",
//             "UPCOMING",
//             "ACTIVE",
//             "FINISHED",
//         ]

//         if (!allowedStatuses.includes(status)) {
//             return NextResponse.json(
//                 { message: "Invalid event status" },
//                 { status: 400 }
//             )
//         }

//         const existingEvent = await prisma.event.findUnique({
//             where: {
//                 id,
//             },
//         })

//         if (!existingEvent) {
//             return NextResponse.json(
//                 { message: "Event not found" },
//                 { status: 404 }
//             )
//         }

//         const event = await prisma.event.update({
//             where: {
//                 id,
//             },
//             data: {
//                 status: status as StatusType,
//             },
//         })

//         return NextResponse.json(
//             {
//                 message: "Event status updated",
//                 event,
//             },
//             { status: 200 }
//         )
//     } catch (error) {
//         console.error(error)

//         return NextResponse.json(
//             { message: "Error updating event status" },
//             { status: 500 }
//         )
//     }
// }

export const PATCH = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json(
                { message: "Invalid id" },
                { status: 400 }
            )
        }

        const action = await req.text()

        if (
            action !== "ACTIVATE" &&
            action !== "DISABLE"
        ) {
            return NextResponse.json(
                { message: "Invalid action" },
                { status: 400 }
            )
        }

        const event = await prisma.event.findUnique({
            where: {
                id,
            },
        })

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            )
        }

        const startDay = event.startDate
            .toISOString()
            .split("T")[0]

        const endDay = event.endDate
            .toISOString()
            .split("T")[0]

        // Activation
        let newStatus: StatusType

        if (startDay < endDay) {
            newStatus = "UPCOMING"

        } else if (startDay === endDay) {
            newStatus = "ACTIVE"

        } else {
            newStatus = "FINISHED"
        }

        // Désactivation
        if (action === "DISABLE") {
            const updatedEvent = await prisma.event.update({
                where: {
                    id,
                },
                data: {
                    status: newStatus,
                },
            })

            return NextResponse.json({
                message: "Event disabled",
                event: updatedEvent,
            })
        }

        if (
            event.startDate.getTime() <
            event.endDate.getTime()
        ) {
            newStatus = "UPCOMING"

        } else if (
            event.startDate.getTime() ===
            event.endDate.getTime()
        ) {
            newStatus = "ACTIVE"

        } else {
            newStatus = "FINISHED"
        }

        const updatedEvent = await prisma.event.update({
            where: {
                id,
            },
            data: {
                status: newStatus,
            },
        })

        return NextResponse.json({
            message: "Event activated",
            event: updatedEvent,
        })

    } catch (error) {
        console.error("Error updating event:", error)

        return NextResponse.json(
            {
                message:
                    "Error updating event status",
            },
            { status: 500 }
        )
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 })
        }

        // await main()

        const event = await prisma.event.findUnique({
            where: { id: id },
        })

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }

        if (event.coverImage && event.coverImage?.startsWith("/upload")) {
            try {
                const imagePath = event.coverImage.split("/uploads/")[1]

                if (imagePath) {
                    await unlink(path.join(process.cwd(), 'public', 'uploads', imagePath))
                }
            } catch (err) {
                throw new Error("Error in deleting image")
            }
        }

        if (event.coverImageId && event.coverImage?.startsWith("/event")) {
            try {
                await imagekit.files.delete(event.coverImageId)
            } catch (error) {
                console.error(
                    "ImageKit deletion error:",
                    error
                )

                return NextResponse.json(
                    {
                        message:
                            "Impossible de supprimer l'image en ligne",
                    },
                    { status: 500 }
                )
            }
        }

        await prisma.event.delete({
            where: { id }
        })
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    } finally {
        // await prisma.$disconnect()
    }
}