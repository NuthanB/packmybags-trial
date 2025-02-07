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
      async get(name: string): Promise<string | null> {
        const store = await cookieStore
        return store.get(name)?.value || null
      },
      set: async (name: string, value: string, options: CookieOptions): Promise<void> => {
              const store = await cookieStore
              store.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions): void {
              const cookieStore = cookies(); // Don't use `await` here
              cookieStore.set(name, "", { ...options, maxAge: -1 }); // Set maxAge to -1 to remove the cookie
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
