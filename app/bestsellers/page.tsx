import { Suspense } from "react"
import { getProducts } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ProductGrid } from "@/components/storefront/product-grid"
import { Badge } from "@/components/ui/badge"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

export default function BestsellersPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold">Bestsellers</h1>
            <Badge variant="default" className="text-sm">
              Popular
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">Our most popular products loved by customers</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <BestsellersSection />
        </Suspense>
      </main>

      <StorefrontFooter />
    </div>
  )
}

async function BestsellersSection() {
  const bestsellerProducts = await getProducts(DEMO_TENANT_ID, {
    sortBy: "sales_desc",
    limit: 20,
  })

  return <ProductGrid products={bestsellerProducts} />
}
