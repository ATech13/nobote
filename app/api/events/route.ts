import { prisma } from "@/services/db"
import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { randomUUID } from "crypto"
// import { main } from "@/services/prismaConnect"
// import { User } from "@/type/types"


export const GET = async () => {
    try {
        // await main();
        const events = await prisma.event.findMany({
            include: {
                users: true
            }
        });
        // console.log(events)
        return NextResponse.json({ message: "Success", events }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    }
    // finally {
    //     await prisma.$disconnect()
    // }
}

export const POST = async (req: Request) => {
    try {

        const formData = await req.formData()
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const startDateStr = formData.get("startDate") as string
        const endDateStr = formData.get("endDate") as string;
        // const users = formData.get("users") as User[] | null
        const image = formData.get("coverImage") as File | null;

        if (!title || !description || !startDateStr || !endDateStr) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // Convert date strings (YYYY-MM-DD) to ISO 8601 DateTime format
        const startDate = new Date(`${startDateStr}T00:00:00Z`)
        const endDate = new Date(`${endDateStr}T23:59:59Z`)

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json({ message: "Invalid date format" }, { status: 400 })
        }

        // await main()

        let coverImage: string | null = null;

        if (image) {
            try {

                const buffer = Buffer.from(await image.arrayBuffer())

                const fileName = `${randomUUID()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
                const uploadDir = path.join(process.cwd(), 'public', 'uploads')

                // Create uploads directory if it doesn't exist
                await fs.promises.mkdir(uploadDir, { recursive: true })

                const imagePath = path.join(uploadDir, fileName)
                await fs.promises.writeFile(imagePath, buffer)
                coverImage = `/uploads/${fileName}`


            } catch (err) {
                console.error("Image upload error:", err)
                coverImage = null
            }
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                startDate,
                endDate,
                coverImage,
            }
        })

        return NextResponse.json({ message: "Event created successfully", event }, { status: 201 })

    } catch (err) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    }
    // finally {
    //     await prisma.$disconnect()
    //}
}