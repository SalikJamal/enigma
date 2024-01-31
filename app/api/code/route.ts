import { IChatCompletionMessageParam } from "@/lib/type"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: IChatCompletionMessageParam = {
    role: "system",
    content: `You are a code generator, when you are asked for code, you should only answer in markdown otherwise reply
    in plain text. Also use comments to explain your code.`
}


export const POST = async (req: Request) => {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!openai.apiKey) return new NextResponse("OPENAI API key not configured", { status: 500 })
        if(!messages) return new NextResponse("Messages are required", { status: 400 })

        const freeTrial = await checkAPILimit()
        const isPro = await checkSubscription()
        if(!freeTrial && !isPro) return new NextResponse("Free trial has expired.", { status: 403 })

        const response = await openai.chat.completions.create({
            messages: [instructionMessage, ...messages],
            model: 'gpt-3.5-turbo-1106',
        })

        if(!isPro) await increaseAPILimit()

        return NextResponse.json(response.choices[0].message, { status: 200 })

    } catch(err) {
        console.log(`[CONVERSATION_ERROR] ${err}`)
        return new NextResponse("Internal Error", { 
            status: 500
        })
    }
}