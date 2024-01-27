'use client'

import Heading from "@/components/heading"
import { MusicIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { conversationSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Empty from "@/components/empty"
import Loader from "@/components/loader"
  

export default function Music() {

    const [music, setMusic] = useState<string>()
    const router = useRouter()

    const form = useForm<z.infer<typeof conversationSchema>>({
        resolver: zodResolver(conversationSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
        try {

            setMusic(undefined)
            const response = await axios.post('/api/music', values)

            setMusic(response.data.audio)
            
            form.reset()

        } catch(err: any) {
            // TODO: Open Pro Modal
            console.log(err)
        } finally {

        }
    }

    return (
        <div>
            <Heading 
                title="Music Generation"
                description="Turn your prompt into music."
                icon={MusicIcon}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField 
                                name="prompt" 
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Funk Groove"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            
                            <Button 
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>


                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    {!music && !isLoading && (
                        <Empty 
                            label="No music generated."
                        />
                    )}

                    {music && (
                        <audio 
                            className="w-full mt-8" 
                            controls
                        >
                            <source src={music} />
                        </audio>
                    )}

                </div>
            </div>
        </div>
    )
}