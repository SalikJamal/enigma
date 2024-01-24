'use client'

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function MobileSidebar() {
    return (
        <Button
            className="md:hidden" 
            variant="ghost" 
            size="icon"
        >
            <Menu size={24} />
        </Button>
    )
}