import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react"


export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        bgColor: "bg-white"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-700",
        bgColor: "bg-emerald-500/10"
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-green-700",
        bgColor: "bg-green-700/10"
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: "/settings",
        color: "text-gray-700",
        bgColor: "bg-gray-700/10"
    }
] as const


export const testimonials = [
    {
        name: "Alice Johnson",
        avatar: "AJ",
        title: "Product Manager",
        description: "Great product! It has significantly improved our workflow."
    },
    {
        name: "Bob Smith",
        avatar: "BS",
        title: "Marketing Specialist",
        description: "I'm impressed with the functionality and ease of use."
    },
    {
        name: "Charlie Brown",
        avatar: "CB",
        title: "UX Designer",
        description: "This application has exceeded my expectations. Kudos to the team!"
    },
    {
        name: "Diana Clark",
        avatar: "DC",
        title: "Data Analyst",
        description: "Amazing tool! It has streamlined our data analysis process."
    },  
] as const;
