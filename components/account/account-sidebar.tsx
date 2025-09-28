"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, Package, Heart, Settings, LogOut, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface AccountSidebarProps {
  user: any // Supabase user type
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const menuItems = [
    {
      href: "/account",
      label: "Overview",
      icon: User,
    },
    {
      href: "/account/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: Package,
    },
    {
      href: "/account/wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      href: "/account/reviews",
      label: "Reviews",
      icon: Star,
    },
    {
      href: "/account/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{user.user_metadata?.name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.user_metadata?.name || "User"}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="mt-6 pt-6 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
