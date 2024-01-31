"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/sidebar"
import { IAPILimitProp } from "@/lib/type"


export default function MobileSidebar({ isPro = false, APILimitCount }: IAPILimitProp) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="md:hidden" 
                    variant="ghost" 
                    size="icon"
                >
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="w-[290px] p-0 border-r-0"
                side="left"
            >
                <Sidebar
                    isPro={isPro} 
                    APILimitCount={APILimitCount} 
                />
            </SheetContent>
        </Sheet>
    )
}