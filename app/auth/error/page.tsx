import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader />

      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-2xl">Authentication Error</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {params?.error ? (
                  <p className="text-sm text-muted-foreground mb-4">Error: {params.error}</p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">An authentication error occurred.</p>
                )}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Try signing in again
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <StorefrontFooter />
    </div>
  )
}
