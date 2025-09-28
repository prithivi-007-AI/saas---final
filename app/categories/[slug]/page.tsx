import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getProducts } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ProductGrid } from "@/components/storefront/product-grid"
import { CategoryHeader } from "@/components/storefront/category-header"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  try {
    const category = await getCategoryBySlug(slug, DEMO_TENANT_ID)

    return (
      <div className="min-h-screen bg-background">
        <StorefrontHeader />

        <main>
          <CategoryHeader category={category} />

          <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <CategoryProducts categoryId={category.id} />
            </Suspense>
          </div>
        </main>

        <StorefrontFooter />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

async function CategoryProducts({ categoryId }: { categoryId: string }) {
  const products = await getProducts(DEMO_TENANT_ID, { categoryId })
  return <ProductGrid products={products} />
}
