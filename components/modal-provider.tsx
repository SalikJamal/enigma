"use client"

import { useEffect, useState } from "react"
import ProModal from "@/components/pro-modal"


export default function ModalProvider() {
    
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <>
            <ProModal />
        </>
    )
}