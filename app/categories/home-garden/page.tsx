import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const homeGardenProducts = [
  {
    id: "1",
    name: "Smart Indoor Herb Garden",
    price: 129.99,
    image: "/smart-indoor-herb-garden.jpg",
    rating: 4.8,
    testimonial:
      "I've always wanted to grow my own herbs but I don't have a green thumb. This little garden is amazing! It tells me when to add water and nutrients. My basil and mint are thriving, and it's so nice to have fresh herbs for cooking.",
    author: "Chris V.",
  },
  {
    id: "2",
    name: "Robot Vacuum Cleaner",
    price: 299.99,
    image: "/robot-vacuum-cleaner.png",
    rating: 4.9,
    testimonial:
      "This has changed my life. With a dog and two kids, my floors were always a mess. I run it every day and the house is consistently clean. It's smart enough to avoid obstacles and the battery life is great.",
    author: "Kim J.",
  },
  {
    id: "3",
    name: "Memory Foam Pillow",
    price: 79.99,
    image: "/memory-foam-pillow.jpg",
    rating: 4.7,
    testimonial:
      "I was having a lot of neck pain in the mornings. I tried this pillow and my sleep has improved dramatically. It's firm but supportive and contours perfectly to my neck. I wake up feeling so much more rested.",
    author: "Sam D.",
  },
  {
    id: "4",
    name: "Patio Furniture Set",
    price: 599.99,
    image: "/outdoor-patio-furniture.png",
    rating: 4.6,
    testimonial:
      "We were looking for a durable and stylish set for our small patio. This one is perfect. It was easy to assemble and looks great. We've had it for a season and it's held up beautifully to the sun and rain.",
    author: "Mike A.",
  },
]

export default function HomeGardenPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Home & Garden</h1>
              <p className="text-xl text-muted-foreground">Transform your living space with our home essentials</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {homeGardenProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

                      {/* Testimonial */}
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                        <p className="text-sm italic text-muted-foreground mb-2 line-clamp-3">
                          "{product.testimonial}"
                        </p>
                        <p className="text-xs font-medium">- {product.author}</p>
                      </div>

                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  )
}
