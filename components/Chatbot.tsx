"use client"

import { useState } from "react"
import { X, MessageCircle } from "lucide-react"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)

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
            {/* No messages state needed */}
            <p className="text-gray-500">No messages yet.</p>
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
