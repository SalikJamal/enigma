import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const POST = async (req: Request) => {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!openai.apiKey) return new NextResponse("OPENAI API key not configured", { status: 500 })
        if(!messages) return new NextResponse("Messages are required", { status: 400 })

        const freeTrial = await checkAPILimit()
        if(!freeTrial) return new NextResponse("Free trial has expired.", { status: 403 })

        const response = await openai.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo-1106',
        })

        await increaseAPILimit()

        return NextResponse.json(response.choices[0].message, { status: 200 })

    } catch(err) {
        console.log(`[CONVERSATION_ERROR] ${err}`)
        return new NextResponse("Internal Error", { 
            status: 500
        })
    }
}