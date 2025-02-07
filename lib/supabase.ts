import { createClient as createClientBase, SupabaseClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

interface CookieOptions {
  path?: string
  domain?: string
  maxAge?: number
  expires?: Date
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}

/**
 * Creates a Supabase server client with proper cookie handling.
 */
export function createClient(cookieStore = cookies()): SupabaseClient {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string): string | null {
        return cookieStore.get(name)?.value || null
      },
      set(name: string, value: string, options: CookieOptions): void {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions): void {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

/**
 * Creates a Supabase client for client-side components.
 */
export function createClientComponentClient(): SupabaseClient {
  return createClientBase(supabaseUrl, supabaseAnonKey)
}
