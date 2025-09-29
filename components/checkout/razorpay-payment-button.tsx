"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPaymentButtonProps {
  amount: number
  currency: string
  orderData: any
}

export function RazorpayPaymentButton({
  amount,
  currency,
  orderData,
}: RazorpayPaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `receipt_order_${Date.now()}`,
        }),
      })

      const order = await res.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          const verificationRes = await fetch(
            "/api/verify-razorpay-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              }),
            }
          )

          const verificationData = await verificationRes.json()

          if (verificationData.success) {
            router.push(`/order-confirmation?orderId=${verificationData.order.id}`)
          } else {
            alert("Payment verification failed. Please try again.")
          }
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Error creating Razorpay order:", error)
      alert("Failed to create Razorpay order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
      {isProcessing ? "Processing..." : "Pay with Razorpay"}
    </Button>
  )
}