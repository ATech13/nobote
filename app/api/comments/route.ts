import { prisma } from "@/services/db"
import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { randomUUID } from "crypto"
import { auth } from "@clerk/nextjs/server"
// import { main } from "@/services/prismaConnect"
// import { User } from "@/type/types"

export const GET = async () => {
    try {
        // await main();
        const event = await prisma.event.findUnique({
            where: {
                
            }
        })

        const comments = await prisma.comment.findMany({
            where: {
                eventId: event?.id
            }
        })
        return NextResponse.json({ message: "Success", comments }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error in comment route" }, { status: 500 })
    } finally {
        // await prisma.$disconnect()
    }
}



export const POST = async (req: Request) => {
    try {

        const formData = await req.formData()
        const description = formData.get("description") as string;
        const eventId = formData.get("eventId") as string

        if (!description || !eventId) { //
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // 2. Retrieve voter IP
        const forwarded = req.headers.get("x-forwarded-for")

        const voterIp = forwarded
            ? forwarded.split(",")[0].trim()
            : "unknown"

        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })
        if (event) {
            const comment = await prisma.comment.create({
                data: {
                    description,
                    eventId: event?.id,
                    voterIp: voterIp,
                },
            })
            return NextResponse.json({ message: "User created successfully", comment }, { status: 201 })
        } else {
            return NextResponse.json(
                { message: "Evenement introuvable" },
                { status: 404 }
            )
        }
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: "Error in comment route" },
            { status: 500 }
        )
    }
}
