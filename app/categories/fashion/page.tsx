import { Suspense } from "react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const fashionProducts = [
  {
    id: "1",
    name: "Everyday T-Shirt (Sustainable)",
    price: 29.99,
    image: "/sustainable-cotton-t-shirt.jpg",
    rating: 4.9,
    testimonial:
      "I love this t-shirt! The fabric is incredibly soft and it holds its shape after a dozen washes. I feel good knowing it's made from sustainable materials. I've already bought it in three other colors.",
    author: "Sarah T.",
  },
  {
    id: "2",
    name: "All-Weather Boots",
    price: 159.99,
    image: "/waterproof-fashion-boots.jpg",
    rating: 4.8,
    testimonial:
      "I live in a rainy city and was looking for a stylish pair of boots that would keep my feet dry. These are perfect. They look great with jeans or a dress, and my feet are always warm and dry. My new favorite shoes!",
    author: "Mark F.",
  },
  {
    id: "3",
    name: "High-Waisted Jeans",
    price: 89.99,
    image: "/high-waisted-denim-jeans.jpg",
    rating: 4.7,
    testimonial:
      "Finding jeans that fit my waist and hips has always been a struggle. These fit like they were custom-made for me. No gap in the back, and they are so comfortable to wear all day. I'm so happy with this purchase.",
    author: "Emily B.",
  },
  {
    id: "4",
    name: "Reversible Tote Bag",
    price: 69.99,
    image: "/reversible-leather-tote-bag.jpg",
    rating: 4.6,
    testimonial:
      "This bag is so versatile! I love that I can change the color to match my outfit. It's also surprisingly spacious and fits everything I need for work or a weekend trip. A great investment.",
    author: "Laura K.",
  },
]

export default function FashionPage() {
  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900 dark:to-rose-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Fashion</h1>
              <p className="text-xl text-muted-foreground">Express your style with our curated fashion collection</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {fashionProducts.map((product) => (
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
