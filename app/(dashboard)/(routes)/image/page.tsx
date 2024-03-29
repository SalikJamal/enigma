'use client'

import Heading from "@/components/heading"
import { Download, DownloadIcon, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { amountOptions, imageSchema, resolutionOptions } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"
import NextImage from "next/image"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"
  

export default function Image() {

    const [images, setImages] = useState<string[]>([])
    const router = useRouter()
    const proModal = useProModal()

    const form = useForm<z.infer<typeof imageSchema>>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof imageSchema>) => {
        try {

            setImages([])
            const response = await axios.post('/api/image', values)

            const urls = response.data.map((image: { url: string }) => image.url)
            setImages(urls)
            
            form.reset()

        } catch(err: any) {
            if(err?.response?.status === 403) {
                proModal.onOpen()
            } else {
                toast.error("Something went wrong, please try again.")
            }
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading 
                title="Image Generation"
                description="Turn your prompt into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a JDM Nissan Skyline R34"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            
                            <FormField 
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map(option => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map(option => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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

                    {images.length === 0 && !isLoading && (
                        <Empty 
                            label="No images generated."
                        />
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                className="rounded-lg overflow-hidden"
                                key={src}
                            >
                                <div className="relative aspect-square">
                                    <NextImage 
                                        alt="Image"
                                        src={src}
                                        fill
                                        sizes="100%"
                                        priority
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button
                                        className="w-full"
                                        variant="secondary"
                                        onClick={() => window.open(src)}
                                    >
                                        <Download className="h-4 w-4 mr-2">
                                            Download
                                        </Download>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}