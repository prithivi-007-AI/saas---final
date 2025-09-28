import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, orderData } = await request.json()

    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      // Create order in database
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          store_id: orderData.storeId,
          total_amount: orderData.totalAmount,
          status: "confirmed",
          shipping_address: orderData.shippingAddress,
          payment_method: "stripe",
          payment_intent_id: paymentIntentId,
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating order:", error)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
      }

      // Create order items
      const orderItems = orderData.items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price + (item.selectedVariant?.priceModifier || 0),
        variant_id: item.selectedVariant?.id || null,
      }))

      await supabase.from("order_items").insert(orderItems)

      // Update product stock
      for (const item of orderData.items) {
        await supabase
          .from("products")
          .update({
            stock_quantity: item.product.stock_quantity - item.quantity,
          })
          .eq("id", item.product.id)
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
      })
    } else {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}
