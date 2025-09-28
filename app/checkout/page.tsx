import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { CheckoutContent } from "@/components/checkout/checkout-content"

export default async function CheckoutPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login?redirect=/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-lg text-muted-foreground">Complete your order</p>
        </div>

        <CheckoutContent user={data.user} />
      </main>

      <StorefrontFooter />
    </div>
  )
}
