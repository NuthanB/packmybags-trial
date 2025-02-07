"use client"

import { useState } from "react"
import { X, MessageCircle } from "lucide-react"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-background border rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <button className="p-2" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </>
  )
}
