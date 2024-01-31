"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"


export default function CrispChat() {
    useEffect(() => {
        Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!)
    }, [])

    return null
}