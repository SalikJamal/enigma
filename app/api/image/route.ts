import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

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

        const freeTrial = await checkAPILimit()
        const isPro = await checkSubscription()
        if(!freeTrial && !isPro) return new NextResponse("Free trial has expired.", { status: 403 })

        const response = await openai.images.generate({
            prompt,
            size: resolution,
            n: parseInt(amount, 10)
        })

        if(!isPro) await increaseAPILimit()

        return NextResponse.json(response.data, { status: 200 })

    } catch(err) {
        console.log(`[IMAGE_ERROR] ${err}`)
        return new NextResponse("Internal Error", { 
            status: 500
        })
    }
}