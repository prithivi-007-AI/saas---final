"use client"

import { useState, useEffect } from "react"
import { StripePaymentForm } from "./stripe-payment-form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function StripePaymentFormWrapper() {
  const [totalAmount] = useState(99.99) // This would come from cart context in real app
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for Stripe initialization
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log("Payment successful:", paymentIntentId)
    // Handle successful payment
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    // Handle payment error
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner className="mr-2" />
        <span>Loading payment form...</span>
      </div>
    )
  }

  return (
    <StripePaymentForm
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentError={handlePaymentError}
      totalAmount={totalAmount}
    />
  )
}
