import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { AccountOverview } from "@/components/account/account-overview"

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar user={data.user} />
          </div>
          <div className="lg:col-span-3">
            <AccountOverview user={data.user} />
          </div>
        </div>
      </div>

      <StorefrontFooter />
    </div>
  )
}
