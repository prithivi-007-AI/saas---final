import { Suspense } from "react"
import { getProducts } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ProductGrid } from "@/components/storefront/product-grid"
import { Badge } from "@/components/ui/badge"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold">Special Deals</h1>
            <Badge variant="destructive" className="text-sm">
              Limited Time
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">Don't miss out on these amazing discounts and special offers</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <DealsSection />
        </Suspense>
      </main>

      <StorefrontFooter />
    </div>
  )
}

async function DealsSection() {
  const dealsProducts = await getProducts(DEMO_TENANT_ID, {
    onSale: true,
    sortBy: "discount_desc",
  })

  if (dealsProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No deals available</h3>
        <p className="text-muted-foreground">Check back soon for new special offers!</p>
      </div>
    )
  }

  return <ProductGrid products={dealsProducts} />
}
