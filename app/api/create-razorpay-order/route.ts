import { type NextRequest, NextResponse } from "next/server"
import { getRazorpayInstance } from "@/lib/razorpay/razorpay-server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await request.json()

    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const razorpay = getRazorpayInstance()
    if (!razorpay) {
      return NextResponse.json({ error: "Razorpay not configured" }, { status: 500 })
    }

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency,
      receipt,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    )
  }
}