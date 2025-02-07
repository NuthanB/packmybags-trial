import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ChatBot from "../components/Chatbot"
import "./globals.css"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Travel Package Booking",
  description: "Book your dream vacation packages",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>

          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ChatBot />
      </body>
    </html>
  )
}