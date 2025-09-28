import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Mail } from "lucide-react"
import Link from "next/link"

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ order_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const params = await searchParams
  const orderId = params.order_id

  if (!orderId) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-700 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Order #{orderId.slice(0, 8)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Order Processing</p>
                <p className="text-sm text-green-600">We're preparing your items for shipment</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Confirmation Email Sent</p>
                <p className="text-sm text-blue-600">Check your inbox for order details</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={`/order-confirmation/${orderId}`}>View Order Details</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/account/orders">View All Orders</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
