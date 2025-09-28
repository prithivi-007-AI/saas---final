import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const beautyHealthProducts = [
  {
    id: "1",
    name: "Vitamin C Serum",
    price: 49.99,
    image: "/vitamin-c-serum-skincare.jpg",
    rating: 4.9,
    testimonial:
      "This serum has transformed my skin. My dark spots have faded and my skin looks so much brighter and more even. It's lightweight and absorbs quickly. I get compliments on my glow all the time!",
    author: "Lisa V.",
  },
  {
    id: "2",
    name: "Electric Toothbrush",
    price: 89.99,
    image: "/electric-toothbrush.jpg",
    rating: 4.8,
    testimonial:
      "I've always used a manual toothbrush but decided to try this one on my dentist's recommendation. My teeth feel so much cleaner, like I've just had a professional cleaning. The timer feature is also a great way to make sure I'm brushing for long enough.",
    author: "Bob R.",
  },
  {
    id: "3",
    name: "Herbal Tea Blend for Sleep",
    price: 19.99,
    image: "/herbal-sleep-tea-blend.jpg",
    rating: 4.7,
    testimonial:
      "I have a hard time winding down at night. I started drinking a cup of this tea an hour before bed and it has made a world of difference. It tastes delicious and helps me relax and fall asleep faster. I wake up feeling refreshed.",
    author: "Carol S.",
  },
]

export default function BeautyHealthPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Beauty & Health</h1>
              <p className="text-xl text-muted-foreground">Nurture your well-being with our premium products</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {beautyHealthProducts.map((product) => (
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
