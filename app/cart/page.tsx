import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { CartContent } from "@/components/cart/cart-content"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-lg text-muted-foreground">Review your items and proceed to checkout</p>
        </div>

        <CartContent />
      </main>

      <StorefrontFooter />
    </div>
  )
}
