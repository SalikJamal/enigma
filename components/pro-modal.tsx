"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Badge } from "@/components/ui/badge"
import { routes } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function ProModal() {

    const proModal = useProModal()
    const servicesOnly = routes.slice(1, 6)

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Enigma
                            <Badge 
                                className="uppercase text-sm py-1" 
                                variant="premium"
                            >
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>

                    <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {servicesOnly.map((service) => (
                            <Card
                                className="p-3 border-black/5 flex items-center justify-between"
                                key={service.label}
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", service.bgColor)}>
                                        <service.icon className={cn("w-6 h-6", service.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {service.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5" />
                            </Card>
                        ))}
                    </div>

                </DialogHeader>

                <DialogFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        variant="premium"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}