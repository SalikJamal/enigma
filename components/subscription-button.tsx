"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

interface SubscriptionButtonProps {
    isPro: boolean;
}


export default function SubscriptionButton({ isPro = false }: SubscriptionButtonProps) {
    
    const [loading, setLoading] = useState(false)

    const handleBilling = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url

        } catch(err) {
            toast.error("Something went wrong, please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            disabled={loading}
            variant={isPro ? "default" : "premium"}
            onClick={handleBilling}
        >
            {isPro ?
                "Manage Subscription"
            :
                "Upgrade"
            }

            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}