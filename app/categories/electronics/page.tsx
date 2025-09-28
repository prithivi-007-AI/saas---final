import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const electronicsProducts = [
  {
    id: "1",
    name: "Noise-Cancelling Headphones",
    price: 199.99,
    image: "/noise-cancelling-headphones.png",
    rating: 4.8,
    testimonial:
      "I was hesitant to spend this much on headphones, but as a student, I needed to block out the noise in the library. These are a game-changer. The sound quality is amazing, and I can finally focus without being distracted. Worth every penny!",
    author: "Alex R.",
  },
  {
    id: "2",
    name: "Smart Home Security Camera",
    price: 149.99,
    image: "/smart-security-camera.jpg",
    rating: 4.9,
    testimonial:
      "Easy to set up and the app is so user-friendly. I can check on my home from anywhere, and the motion alerts are incredibly reliable. It gives me so much peace of mind when I'm away.",
    author: "Maria P.",
  },
  {
    id: "3",
    name: "Portable Power Bank",
    price: 49.99,
    image: "/portable-power-bank.png",
    rating: 4.7,
    testimonial:
      "I'm always on the go and my phone battery dies fast. This power bank is a lifesaver. It charges my phone super fast and I can get multiple charges out of it. It's compact and fits in my pocket easily.",
    author: "David C.",
  },
  {
    id: "4",
    name: "Ergonomic Wireless Mouse",
    price: 79.99,
    image: "/ergonomic-wireless-mouse.jpg",
    rating: 4.6,
    testimonial:
      "I started getting wrist pain from working all day, so I switched to this mouse. The design is so comfortable and natural. My wrist pain is completely gone, and I feel like I'm more productive now.",
    author: "Jessica L.",
  },
]

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Electronics</h1>
              <p className="text-xl text-muted-foreground">Discover cutting-edge technology and innovative gadgets</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {electronicsProducts.map((product) => (
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
