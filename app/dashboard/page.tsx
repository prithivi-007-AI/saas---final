import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    // Check if user has store owner role
    const { data: profile } = await supabase.from("profiles").select("role, store_id").eq("id", user.id).single()

    if (!profile || profile.role !== "store_owner") {
      redirect("/")
    }

    return <DashboardContent />
  } catch (error) {
    console.error("Dashboard page auth error:", error)
    redirect("/auth/login")
  }
}
