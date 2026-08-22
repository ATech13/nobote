
// import ImageKit from "imagekit"
// import config from "@/lib/config";
// import { NextResponse } from "next/server";

// const {env : {imagekit : {publicKey, privateKey, urlEndpoint}}} = config;

// const imagekit = new ImageKit(publicKey, privateKey, urlEndpoint);

// export async function GET() {
//     return NextResponse.json(await imagekit.getAuthenticationParameters(), { status: 200 });
// }

import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

        if (!publicKey || !privateKey) {
            console.error("ImageKit environment variables missing")

            return NextResponse.json(
                {
                    message: "ImageKit environment variables missing",
                },
                { status: 500 }
            )
        }

        const { token, expire, signature } =
            getUploadAuthParams({
                privateKey,
                publicKey,
            })

        return NextResponse.json({
            token,
            expire,
            signature,
            publicKey,
        })

    } catch (error) {
        console.error(
            "ImageKit authentication error:",
            error
        )

        return NextResponse.json(
            {
                message: "ImageKit authentication failed",
            },
            { status: 500 }
        )
    }
}