import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
          <p className="text-muted-foreground">Your order was not completed</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">What happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Your payment was cancelled and no charges were made to your account. Your items are still in your cart if
              you'd like to try again.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/cart" className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Return to Cart
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/checkout" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Try Checkout Again
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
