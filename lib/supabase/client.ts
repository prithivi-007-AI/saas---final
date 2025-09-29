import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

export function createClient() {
  // Use placeholder credentials if the environment variables are not set.
  // This is to allow the application to build successfully in environments
  // where the secrets are not available, such as Vercel's build environment.
  // In a production environment, these should be set as environment variables.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

export function createBrowserClient() {
  return createClient()
}