'use client'

import { IAPILimitProp } from "@/lib/type"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/lib/constants"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-modal"


export default function FreeCounter({ isPro = false, APILimitCount = 0 }: IAPILimitProp) {

    const [mounted, setMounted] = useState(false)
    const proModal = useProModal()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null
    if(isPro) return null

    return (
        <div className="px-3 ">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-white text-sm mb-4 space-y-2">
                        <p>{APILimitCount} / {MAX_FREE_COUNTS} Free Generations</p>
                        <Progress 
                            className="h-3"
                            value={APILimitCount / MAX_FREE_COUNTS * 100}
                        />
                    </div>
                    <Button 
                        className="w-full"
                        variant="premium"
                        onClick={() => proModal.onOpen()}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}