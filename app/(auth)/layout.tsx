import { IReactChildren } from "@/lib/type"


export default function AuthLayout({ children }: IReactChildren) {
    return (
        <div className="flex justify-center items-center h-full">
            {children}
        </div>
    )
}