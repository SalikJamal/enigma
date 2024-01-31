import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
import { getAPILimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"


export default async function Navbar() {

    const APILimitCount = await getAPILimitCount()
    const isPro = await checkSubscription()

    return (
        <div className="flex items-center p-4">
            <MobileSidebar
                isPro={isPro} 
                APILimitCount={APILimitCount}
            />
            <div className="flex justify-end w-full">
                <UserButton 
                    afterSignOutUrl="/"
                />
            </div>
        </div>
    )
}