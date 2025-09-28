import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Percent } from "lucide-react"

const dealsProducts = [
  {
    id: "1",
    name: "Noise-Cancelling Headphones",
    originalPrice: 299.99,
    price: 199.99,
    discount: 33,
    image: "/noise-cancelling-headphones.png",
    rating: 4.8,
    testimonial:
      "I was hesitant to spend this much on headphones, but as a student, I needed to block out the noise in the library. These are a game-changer. The sound quality is amazing, and I can finally focus without being distracted. Worth every penny!",
    author: "Alex R.",
  },
  {
    id: "2",
    name: "Adjustable Dumbbells",
    originalPrice: 349.99,
    price: 249.99,
    discount: 29,
    image: "/adjustable-dumbbells.jpg",
    rating: 4.9,
    testimonial:
      "I wanted to build a home gym but didn't have a lot of space. These adjustable dumbbells are the perfect solution. They replace an entire rack of weights and are super easy to use. Great for all my workouts.",
    author: "Tom W.",
  },
  {
    id: "3",
    name: "Robot Vacuum Cleaner",
    originalPrice: 399.99,
    price: 299.99,
    discount: 25,
    image: "/robot-vacuum-cleaner.png",
    rating: 4.9,
    testimonial:
      "This has changed my life. With a dog and two kids, my floors were always a mess. I run it every day and the house is consistently clean. It's smart enough to avoid obstacles and the battery life is great.",
    author: "Kim J.",
  },
  {
    id: "4",
    name: "All-Weather Boots",
    originalPrice: 199.99,
    price: 159.99,
    discount: 20,
    image: "/waterproof-fashion-boots.jpg",
    rating: 4.8,
    testimonial:
      "I live in a rainy city and was looking for a stylish pair of boots that would keep my feet dry. These are perfect. They look great with jeans or a dress, and my feet are always warm and dry. My new favorite shoes!",
    author: "Mark F.",
  },
  {
    id: "5",
    name: "Smart Home Security Camera",
    originalPrice: 199.99,
    price: 149.99,
    discount: 25,
    image: "/smart-security-camera.jpg",
    rating: 4.9,
    testimonial:
      "Easy to set up and the app is so user-friendly. I can check on my home from anywhere, and the motion alerts are incredibly reliable. It gives me so much peace of mind when I'm away.",
    author: "Maria P.",
  },
  {
    id: "6",
    name: "Electric Toothbrush",
    originalPrice: 119.99,
    price: 89.99,
    discount: 25,
    image: "/electric-toothbrush.jpg",
    rating: 4.8,
    testimonial:
      "I've always used a manual toothbrush but decided to try this one on my dentist's recommendation. My teeth feel so much cleaner, like I've just had a professional cleaning. The timer feature is also a great way to make sure I'm brushing for long enough.",
    author: "Bob R.",
  },
]

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Percent className="w-8 h-8 text-red-500" />
                <h1 className="text-4xl lg:text-5xl font-bold">Special Deals</h1>
              </div>
              <p className="text-xl text-muted-foreground">Limited time offers on our best products</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dealsProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
                        -{product.discount}%
                      </Badge>
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
                      <div className="flex items-center gap-2 mb-4">
                        <p className="text-2xl font-bold text-primary">${product.price}</p>
                        <p className="text-lg text-muted-foreground line-through">${product.originalPrice}</p>
                      </div>

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
