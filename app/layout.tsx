import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VendAI - FMCG Distribution Platform",
  description: "AI-powered distribution management for FMCG businesses in Kenya",
    generator: 'v0.dev',
  icons: {
    icon: "/vendai-logo.jpeg", // Path to your favicon in the public folder
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
