"use client"

import { useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminOverview } from "./admin-overview"
import { TenantManagement } from "./tenant-management"
import { UserManagement } from "./user-management"
import { StoreManagement } from "./store-management"
import { SystemAnalytics } from "./system-analytics"
import { SystemSettings } from "./system-settings"

type AdminView = "overview" | "tenants" | "users" | "stores" | "analytics" | "settings"

export function AdminContent() {
  const [currentView, setCurrentView] = useState<AdminView>("overview")

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <AdminOverview />
      case "tenants":
        return <TenantManagement />
      case "users":
        return <UserManagement />
      case "stores":
        return <StoreManagement />
      case "analytics":
        return <SystemAnalytics />
      case "settings":
        return <SystemSettings />
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
