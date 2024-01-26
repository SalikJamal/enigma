import { IChatCompletionMessageParam } from "@/lib/type"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: IChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator, you must answer only in markdown code snippets. Use code comments for explanation"
}


export const POST = async (req: Request) => {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!openai.apiKey) return new NextResponse("OPENAI API key not configured", { status: 500 })
        if(!messages) return new NextResponse("Messages are required", { status: 400 })

        const response = await openai.chat.completions.create({
            messages: [instructionMessage, ...messages],
            model: 'gpt-3.5-turbo-1106',
        })

        return NextResponse.json(response.choices[0].message, { status: 200 })

    } catch(err) {
        console.log(`[CONVERSATION_ERROR] ${err}`)
        return new NextResponse("Internal Error", { 
            status: 500
        })
    }
}