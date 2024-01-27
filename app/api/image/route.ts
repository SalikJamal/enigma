import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const POST = async (req: Request) => {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount = 1, resolution = "512x512" } = body

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!openai.apiKey) return new NextResponse("OPENAI API key not configured", { status: 500 })
        if(!prompt) return new NextResponse("Prompt is required", { status: 400 })
        if(!amount) return new NextResponse("Amount is required", { status: 400 })
        if(!resolution) return new NextResponse("Resolution is required", { status: 400 })

        const response = await openai.images.generate({
            prompt,
            model: 'dall-e-2',
            quality: "hd",
            size: resolution,
            n: parseInt(amount, 10)
        })

        return NextResponse.json(response.data[0].url, { status: 200 })

    } catch(err) {
        console.log(`[IMAGE_ERROR] ${err}`)
        return new NextResponse("Internal Error", { 
            status: 500
        })
    }
}