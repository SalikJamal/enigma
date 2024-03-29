"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const montserrat = Montserrat({ 
    weight: "600",
    subsets: ["latin"] 
})


export default function LandingNavbar() {
    
    const { isSignedIn } = useAuth()

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link
                className="flex items-center"
                href="/"
            >
                <div className="relative w-8 h-8 mr-4">
                    <Image 
                        src="/logo.png"
                        alt="Logo"
                        fill
                        priority
                        sizes="100%"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", montserrat.className)}>
                    Enigma
                </h1>
            </Link>

            <div className="flex items-center gap-x-2">
                <Link
                    href={isSignedIn ? "/dashboard" : "/sign-in"}
                >
                    <Button
                        className="rounded-full" 
                        variant="outline"
                    > 
                        Sign In
                    </Button>
                </Link>
            </div>
        </nav>
    )
}