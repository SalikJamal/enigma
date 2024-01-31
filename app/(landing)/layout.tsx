import { IReactChildren } from "@/lib/type"


export default function LandingLayout({ children }: IReactChildren) {

    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )

}