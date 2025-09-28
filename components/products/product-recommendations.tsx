import { ProductGrid } from "@/components/storefront/product-grid"
import type { Product } from "@/lib/database/types"

interface ProductRecommendationsProps {
  products: Product[]
}

export function ProductRecommendations({ products }: ProductRecommendationsProps) {
  if (products.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">You might also like</h2>
      <ProductGrid products={products} />
    </div>
  )
}
