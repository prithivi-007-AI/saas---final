"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setStatus("error")
          setMessage("Invalid or expired verification link")
          return
        }

        if (data.session) {
          setStatus("success")
          setMessage("Your email has been successfully verified!")
          // Redirect to account page after 3 seconds
          setTimeout(() => {
            router.push("/account")
          }, 3000)
        } else {
          setStatus("error")
          setMessage("Unable to verify email. Please try again.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An error occurred during verification")
      }
    }

    verifyEmail()
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full flex items-center justify-center">
                {status === "loading" && (
                  <div className="bg-blue-100">
                    <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                  </div>
                )}
                {status === "success" && (
                  <div className="bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-100">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">
                {status === "loading" && "Verifying Email..."}
                {status === "success" && "Email Verified!"}
                {status === "error" && "Verification Failed"}
              </CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {status === "success" && (
                <p className="text-sm text-muted-foreground mb-4">Redirecting you to your account...</p>
              )}
              {status === "error" && (
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/auth/signup">Try Signing Up Again</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              )}
              {status === "success" && (
                <Button asChild className="w-full">
                  <Link href="/account">Go to Account</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <StorefrontFooter />
    </div>
  )
}
