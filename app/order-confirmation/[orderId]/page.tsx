import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface OrderConfirmationPageProps {
  params: {
    orderId: string
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch order details
  const { data: order } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          image_url,
          price
        )
      )
    `)
    .eq("id", params.orderId)
    .eq("user_id", user.id)
    .single()

  if (!order) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Order Number:</span>
            <span>#{order.id.slice(0, 8)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Order Date:</span>
            <span>{new Date(order.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="capitalize">{order.status}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">${order.total_amount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.products.image_url || "/placeholder.svg?height=60&width=60"}
                  alt={item.products.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.products.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {order.shipping_address && (
              <>
                <p>
                  {order.shipping_address.firstName} {order.shipping_address.lastName}
                </p>
                <p>{order.shipping_address.address}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}
                </p>
                <p>{order.shipping_address.country}</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-gray-600">You will receive an email confirmation shortly with tracking information.</p>

        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/account">View Order History</Link>
          </Button>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
