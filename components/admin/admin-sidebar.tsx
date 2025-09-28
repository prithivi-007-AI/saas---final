"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, Users, Store, BarChart3, Settings, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"

interface AdminSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tenants", label: "Tenants", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "stores", label: "Stores", icon: Store },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const { signOut } = useAuth()

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Super Admin</h2>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors",
                currentView === item.id
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
