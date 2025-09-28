import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Sparkles } from "lucide-react"

const newArrivalsProducts = [
  {
    id: "1",
    name: "Running Smartwatch",
    price: 199.99,
    image: "/running-smartwatch.jpg",
    rating: 4.7,
    isNew: true,
    testimonial:
      "This watch is an amazing training tool. The GPS is spot-on, and I love the heart rate and pace tracking features. It has motivated me to run faster and longer. It syncs with my phone seamlessly and the battery lasts for days.",
    author: "Ben C.",
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    price: 49.99,
    image: "/vitamin-c-serum-skincare.jpg",
    rating: 4.9,
    isNew: true,
    testimonial:
      "This serum has transformed my skin. My dark spots have faded and my skin looks so much brighter and more even. It's lightweight and absorbs quickly. I get compliments on my glow all the time!",
    author: "Lisa V.",
  },
  {
    id: "3",
    name: "Smart Indoor Herb Garden",
    price: 129.99,
    image: "/smart-indoor-herb-garden.jpg",
    rating: 4.8,
    isNew: true,
    testimonial:
      "I've always wanted to grow my own herbs but I don't have a green thumb. This little garden is amazing! It tells me when to add water and nutrients. My basil and mint are thriving, and it's so nice to have fresh herbs for cooking.",
    author: "Chris V.",
  },
  {
    id: "4",
    name: "Reversible Tote Bag",
    price: 69.99,
    image: "/reversible-leather-tote-bag.jpg",
    rating: 4.6,
    isNew: true,
    testimonial:
      "This bag is so versatile! I love that I can change the color to match my outfit. It's also surprisingly spacious and fits everything I need for work or a weekend trip. A great investment.",
    author: "Laura K.",
  },
  {
    id: "5",
    name: "Educational Subscription Box",
    price: 29.99,
    image: "/educational-subscription-box.jpg",
    rating: 4.7,
    isNew: true,
    testimonial:
      "I bought this for my niece and she absolutely loves it. Each month is a new topic with fun experiments and activities. It makes learning so engaging and she can't wait for the next box to arrive.",
    author: "Kevin H.",
  },
  {
    id: "6",
    name: "Herbal Sleep Tea Blend",
    price: 19.99,
    image: "/herbal-sleep-tea-blend.jpg",
    rating: 4.7,
    isNew: true,
    testimonial:
      "I have a hard time winding down at night. I started drinking a cup of this tea an hour before bed and it has made a world of difference. It tastes delicious and helps me relax and fall asleep faster. I wake up feeling refreshed.",
    author: "Carol S.",
  },
]

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900 dark:to-purple-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-violet-500" />
                <h1 className="text-4xl lg:text-5xl font-bold">New Arrivals</h1>
              </div>
              <p className="text-xl text-muted-foreground">Discover our latest products and innovations</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {newArrivalsProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 z-10 bg-violet-500 hover:bg-violet-600">NEW</Badge>
                      )}
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
