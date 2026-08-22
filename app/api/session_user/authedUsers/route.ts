import prisma from "@/services/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // await main();
        const users = await prisma.authUser.findMany();
        // console.log(events)
        return NextResponse.json({ message: "Success", users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error in event route" }, { status: 500 })
    }
    // finally {
    //     await prisma.$disconnect()
    // }
}