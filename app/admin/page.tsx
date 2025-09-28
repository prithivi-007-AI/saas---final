import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminContent } from "@/components/admin/admin-content"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    // Check if user has super admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role !== "super_admin") {
      redirect("/")
    }

    return <AdminContent />
  } catch (error) {
    console.error("Admin page auth error:", error)
    redirect("/auth/login")
  }
}
