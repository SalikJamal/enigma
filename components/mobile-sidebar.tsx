'use client'

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/sidebar"


export default function MobileSidebar() {
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
                className="w-[300px] p-0 border-r-0"
                side="left"
            >
                <Sidebar />   
            </SheetContent>
        </Sheet>
    )
}