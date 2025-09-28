"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface StripePaymentFormProps {
  onPaymentSuccess: (paymentIntentId: string) => void
  onPaymentError: (error: string) => void
  totalAmount: number
}

export function StripePaymentForm({ onPaymentSuccess, onPaymentError, totalAmount }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        onPaymentError(error.message || "Payment failed")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent.id)
      }
    } catch (error) {
      onPaymentError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner className="mr-2" />
        <span>Loading payment form...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Amount:</span>
          <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
        {isProcessing ? (
          <>
            <LoadingSpinner className="mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay $${totalAmount.toFixed(2)}`
        )}
      </Button>
    </form>
  )
}
