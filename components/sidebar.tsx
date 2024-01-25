'use client'

import { routes } from "@/lib/data" // WHY DOES THIS NOT WORK
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const montserrat = Montserrat({ 
    weight: "600", 
    subsets: ["latin-ext"] 
})


export default function Sidebar() {

    const pathname = usePathname()

    return (
        <div
            className="space-y-4 py-4 flex flex-col
            h-full bg-[#111827] text-white"
        >
            <div
                className="px-3 py-2 flex-1"
            >
                <Link 
                    className="flex items-center pl-3
                    mb-14"
                    href="/dashboard"
                >
                    <div
                        className="relative w-8 h-8
                        mr-4"
                    >
                        <Image 
                            fill
                            alt="Logo"
                            src="/logo.png"
                            sizes="100%"
                            priority
                        />
                    </div>
                    <h1
                        className={cn("text-2xl font-bold", montserrat.className)}
                    >
                        Enigma
                    </h1>
                </Link>
                <div
                    className="space-y-1"
                >
                    {routes.map(route => (
                        <Link
                            className={cn(`text-sm group flex p-3 w-full
                            justify-start font-medium cursor-pointer
                            hover:text-white hover:bg-white/10
                            rounded-lg transition`, pathname === route.href ? 
                            "text-white bg-white/10" : "text-zinc-400"
                            )}
                            href={route.href}
                            key={route.href}
                        >
                            <div
                                className="flex items-center flex-1"
                            >
                                <route.icon 
                                    className={cn("h-5 w-5 mr-3", route.color)} 
                                />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}