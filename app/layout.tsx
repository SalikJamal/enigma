import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { IReactChildren } from "@/lib/type"
import ModalProvider from "@/components/modal-provider"
import ToasterProvider from "@/components/toaster-provider"
import CrispProvider from "@/components/crisp-provider"
import Head from "next/head"

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
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
