import type { Metadata } from "next"
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CRVE | AI & Digital Product Studio",
  description: "An independent design and development studio. We build clean, scalable digital products and brand systems that ship faster and grow revenue.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${plexMono.variable} dark`}>
      <body className="min-h-screen bg-[#050505] text-[#ebebeb] antialiased selection:bg-[#FF6B50] selection:text-white overflow-x-hidden font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
