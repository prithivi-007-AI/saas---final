import { Suspense } from "react"
import { getProducts, getCategories } from "@/lib/database/queries"
import { HeroSection } from "@/components/storefront/hero-section"
import { FeaturedCategories } from "@/components/storefront/featured-categories"
import { FeaturedProducts } from "@/components/storefront/featured-products"
import { NewsletterSection } from "@/components/storefront/newsletter-section"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// For demo purposes, using a default tenant ID
const DEMO_TENANT_ID = "550e8400-e29b-41d4-a716-446655440000"

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        <HeroSection />

        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedCategoriesSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProductsSection />
        </Suspense>

        <NewsletterSection />
      </main>

      <StorefrontFooter />
    </div>
  )
}

async function FeaturedCategoriesSection() {
  const categories = await getCategories(DEMO_TENANT_ID, null)
  return <FeaturedCategories categories={categories} />
}

async function FeaturedProductsSection() {
  const featuredProducts = await getProducts(DEMO_TENANT_ID, {
    featured: true,
    limit: 8,
  })
  return <FeaturedProducts products={featuredProducts} />
}
