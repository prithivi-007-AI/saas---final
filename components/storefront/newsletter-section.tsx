"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-lg opacity-90">
              Get the latest updates on new products, exclusive deals, and tech news delivered straight to your inbox.
            </p>
          </div>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 text-lg">
              <CheckCircle className="h-6 w-6" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground text-foreground"
                required
              />
              <Button type="submit" variant="secondary" disabled={isLoading} className="px-8">
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}

          <p className="text-sm opacity-75 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
        </div>
      </div>
    </section>
  )
}
