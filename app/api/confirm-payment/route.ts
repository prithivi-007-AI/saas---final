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
      const items = orderData.items.map((item: any) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price + (item.selectedVariant?.priceModifier || 0),
        variant_id: item.selectedVariant?.id || null,
      }))

      const { data: order, error } = await supabase.rpc("create_order_with_items", {
        p_user_id: user.id,
        p_store_id: orderData.storeId,
        p_total_amount: orderData.totalAmount,
        p_shipping_address: orderData.shippingAddress,
        p_payment_method: "stripe",
        p_payment_intent_id: paymentIntentId,
        p_items: items,
      })

      if (error) {
        console.error("Error creating order with items:", error)
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        order,
      })
    } else {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}
