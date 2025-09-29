"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"
import { RazorpayPaymentButton } from "@/components/checkout/razorpay-payment-button"

// This is a mock. In a real app, this would come from a cart context/state management.
const mockOrderData = {
  storeId: "12345",
  totalAmount: 50, // Example: $50
  shippingAddress: {
    name: "Test User",
    address: "123 Test St",
    city: "Testville",
    state: "TS",
    zip: "12345",
  },
  items: [
    { product: { id: "prod_1", price: 20 }, quantity: 1, selectedVariant: null },
    { product: { id: "prod_2", price: 30 }, quantity: 1, selectedVariant: null },
  ],
}

export default function CheckoutPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const router = useRouter()
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)

  const handleBack = () => {
    router.push("/checkout/shipping")
  }

  const paymentOptions = [
    { id: "card", name: "Credit/Debit Card (via Razorpay)", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: Smartphone, disabled: true },
    { id: "apple_pay", name: "Apple Pay", icon: Smartphone, disabled: true },
  ]

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsRazorpayLoaded(true)}
      />
      <div className="min-h-screen bg-background">
        <StorefrontHeader />

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Payment Information</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center">
                1
              </span>
              <span>Shipping</span>
              <span>→</span>
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                2
              </span>
              <span>Payment</span>
              <span>→</span>
              <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center">
                3
              </span>
              <span>Review</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  {paymentOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 p-4 border rounded-lg ${
                          option.disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          disabled={option.disabled}
                        />
                        <Label
                          htmlFor={option.id}
                          className={`font-medium flex-1 ${
                            option.disabled ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          <Icon className="h-5 w-5 inline-block mr-2" />
                          {option.name}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Form */}
            {paymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pay with Razorpay</CardTitle>
                </CardHeader>
                <CardContent>
                  {isRazorpayLoaded ? (
                    <RazorpayPaymentButton
                      amount={mockOrderData.totalAmount}
                      currency="INR"
                      orderData={mockOrderData}
                    />
                  ) : (
                    <p>Loading payment options...</p>
                  )}
                </CardContent>
              </Card>
            )}

            {paymentMethod === "paypal" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      PayPal is not available at this time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "apple_pay" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Apple Pay is not available at this time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shipping
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link href="/checkout/review">
                  Review Order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <StorefrontFooter />
      </div>
    </>
  )
}