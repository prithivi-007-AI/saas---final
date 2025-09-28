import { Suspense } from "react"
import { getCategories } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { CategoriesGrid } from "@/components/storefront/categories-grid"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">All Categories</h1>
          <p className="text-lg text-muted-foreground">Browse our complete collection of product categories</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <CategoriesSection />
        </Suspense>
      </main>

      <StorefrontFooter />
    </div>
  )
}

async function CategoriesSection() {
  const categories = await getCategories(DEMO_TENANT_ID, null)
  return <CategoriesGrid categories={categories} />
}
