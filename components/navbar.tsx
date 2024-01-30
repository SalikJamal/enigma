import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
import { getAPILimitCount } from "@/lib/api-limit"


export default async function Navbar() {

    const APILimitCount = await getAPILimitCount()

    return (
        <div className="flex items-center p-4">
            <MobileSidebar APILimitCount={APILimitCount}/>
            <div className="flex justify-end w-full">
                <UserButton 
                    afterSignOutUrl="/"
                />
            </div>
        </div>
    )
}