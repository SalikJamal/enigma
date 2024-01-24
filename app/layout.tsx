import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { IReactChildren } from "@/lib/type"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Enigma",
  description: "AI Platform"
}


export default function RootLayout({
  children
}: Readonly<IReactChildren>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
