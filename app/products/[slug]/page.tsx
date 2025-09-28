import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProductBySlug, getProducts } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ProductDetail } from "@/components/products/product-detail"
import { ProductRecommendations } from "@/components/products/product-recommendations"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  try {
    const product = await getProductBySlug(slug, DEMO_TENANT_ID)

    return (
      <div className="min-h-screen bg-background">
        <StorefrontHeader />

        <main>
          <ProductDetail product={product} />

          <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <RecommendedProducts categoryId={product.category_id} currentProductId={product.id} />
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

async function RecommendedProducts({ categoryId, currentProductId }: { categoryId: string; currentProductId: string }) {
  const recommendedProducts = await getProducts(DEMO_TENANT_ID, {
    categoryId,
    limit: 4,
    excludeId: currentProductId,
  })

  if (recommendedProducts.length === 0) return null

  return <ProductRecommendations products={recommendedProducts} />
}
