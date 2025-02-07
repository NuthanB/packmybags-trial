"use client"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevents hydration mismatch

  return (
    <div className="relative">
      <button className="p-2 border rounded-lg flex items-center justify-center relative">
        {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setTheme("light")}>
          Light
        </button>
        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setTheme("system")}>
          System
        </button>
      </div>
    </div>
  )
}
