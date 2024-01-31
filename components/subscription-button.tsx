"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"

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
            console.log("BILLING_ERROR", err)
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