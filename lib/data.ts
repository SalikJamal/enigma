import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react"


export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-700"
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: "/settings",
        color: "text-white"
    }
] as const