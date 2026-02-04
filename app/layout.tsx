import React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Courier_Prime } from "next/font/google"

import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Piano Stream HUD",
  description: "Cyberpunk Arcade HUD Overlay for Piano Streaming",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${courierPrime.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
