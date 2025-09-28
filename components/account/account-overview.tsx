import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Heart, MapPin, Star } from "lucide-react"
import Link from "next/link"

interface AccountOverviewProps {
  user: any // Supabase user type
}

export function AccountOverview({ user }: AccountOverviewProps) {
  // Mock data - would come from database queries
  const stats = {
    orders: 12,
    wishlistItems: 5,
    addresses: 2,
    reviews: 8,
  }

  const recentOrders = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      total: 299.99,
      status: "Delivered",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-10",
      total: 149.99,
      status: "Shipped",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.user_metadata?.name || "User"}!</h1>
        <p className="text-muted-foreground">Manage your account and track your orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.orders}</p>
                <p className="text-sm text-muted-foreground">Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.wishlistItems}</p>
                <p className="text-sm text-muted-foreground">Wishlist</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.addresses}</p>
                <p className="text-sm text-muted-foreground">Addresses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.reviews}</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/orders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Track Orders</h3>
            <p className="text-sm text-muted-foreground mb-4">Check the status of your recent orders</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <h3 className="font-semibold mb-2">Wishlist</h3>
            <p className="text-sm text-muted-foreground mb-4">View your saved items and favorites</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/wishlist">View Wishlist</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-500" />
            <h3 className="font-semibold mb-2">Addresses</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your shipping addresses</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/addresses">Manage Addresses</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
