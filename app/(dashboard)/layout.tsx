import Navbar from "@/components/navbar"
import { IReactChildren } from "@/lib/type"
import Sidebar from "@/components/sidebar"
import { getAPILimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"


export default async function DashboardLayout({ children }: IReactChildren) {

    const APILimitCount = await getAPILimitCount()
    const isPro = await checkSubscription()

    return (
        <div className="h-full relative">
            <div 
                className="hidden h-full md:flex md:w-72 
                md:flex-col md:fixed md:inset-y-0 bg-gray-900"
            >
                <Sidebar
                    isPro={isPro}
                    APILimitCount={APILimitCount} 
                />
            </div>
            <main 
                className="md:pl-72"
            >
                <Navbar />
                {children}
            </main>
        </div>
    )
}