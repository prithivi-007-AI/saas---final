import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const sportsFitnessProducts = [
  {
    id: "1",
    name: "Premium Yoga Mat",
    price: 59.99,
    image: "/premium-yoga-mat.png",
    rating: 4.8,
    testimonial:
      "The grip on this mat is fantastic. I no longer slip during my downward dog, even when I'm sweating. It's also thick enough to be comfortable on my knees. I highly recommend it for any yogi.",
    author: "Mia L.",
  },
  {
    id: "2",
    name: "Adjustable Dumbbells",
    price: 249.99,
    image: "/adjustable-dumbbells.jpg",
    rating: 4.9,
    testimonial:
      "I wanted to build a home gym but didn't have a lot of space. These adjustable dumbbells are the perfect solution. They replace an entire rack of weights and are super easy to use. Great for all my workouts.",
    author: "Tom W.",
  },
  {
    id: "3",
    name: "Smartwatch for Runners",
    price: 199.99,
    image: "/running-smartwatch.jpg",
    rating: 4.7,
    testimonial:
      "This watch is an amazing training tool. The GPS is spot-on, and I love the heart rate and pace tracking features. It has motivated me to run faster and longer. It syncs with my phone seamlessly and the battery lasts for days.",
    author: "Ben C.",
  },
]

export default function SportsFitnessPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Sports & Fitness</h1>
              <p className="text-xl text-muted-foreground">Achieve your fitness goals with our premium equipment</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sportsFitnessProducts.map((product) => (
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
