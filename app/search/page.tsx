import { Suspense } from "react"
import { getProducts } from "@/lib/database/queries"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SearchResults } from "@/components/search/search-results"

const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; min_price?: string; max_price?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {query ? `Search results for "${query}"` : "Search Products"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {query ? "Find what you're looking for" : "Search our entire catalog"}
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <SearchResultsSection searchParams={params} />
        </Suspense>
      </main>

      <StorefrontFooter />
    </div>
  )
}

async function SearchResultsSection({ searchParams }: { searchParams: any }) {
  const products = await getProducts(DEMO_TENANT_ID, {
    search: searchParams.q,
    categoryId: searchParams.category,
    minPrice: searchParams.min_price ? Number.parseFloat(searchParams.min_price) : undefined,
    maxPrice: searchParams.max_price ? Number.parseFloat(searchParams.max_price) : undefined,
    sortBy: searchParams.sort,
  })

  return <SearchResults products={products} searchParams={searchParams} />
}
