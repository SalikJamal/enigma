import type { LucideIcon } from "lucide-react"

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}


export default function Heading({ 
    title, 
    description, 
    icon 
}: HeadingProps) {

    return (
        <div>
            Heading Component
        </div>
    )
    
}