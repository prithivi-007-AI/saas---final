import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = await request.json()

    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return NextResponse.json({ error: "Razorpay key secret not configured" }, { status: 500 })
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
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
        p_payment_method: "razorpay",
        p_payment_intent_id: razorpay_payment_id,
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
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error)
    return NextResponse.json(
      { error: "Failed to verify Razorpay payment" },
      { status: 500 }
    )
  }
}