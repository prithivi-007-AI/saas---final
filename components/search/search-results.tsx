"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/storefront/product-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Product } from "@/lib/database/types"

interface SearchResultsProps {
  products: Product[]
  searchParams: any
}

export function SearchResults({ products, searchParams }: SearchResultsProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [minPrice, setMinPrice] = useState(searchParams.min_price || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.max_price || "")
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/search?${params.toString()}`)
  }

  const applyPriceFilter = () => {
    const params = new URLSearchParams(currentSearchParams.toString())
    if (minPrice) params.set("min_price", minPrice)
    else params.delete("min_price")
    if (maxPrice) params.set("max_price", maxPrice)
    else params.delete("max_price")
    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    if (searchParams.q) params.set("q", searchParams.q)
    router.push(`/search?${params.toString()}`)
    setMinPrice("")
    setMaxPrice("")
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <Select value={searchParams.sort || "default"} onValueChange={(value) => updateSearchParams("sort", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
              <SelectItem value="rating_desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filters
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-price">Min Price</Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-price">Max Price</Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={applyPriceFilter} className="mt-4">
              Apply Price Filter
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}
