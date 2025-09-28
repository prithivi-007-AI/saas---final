"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { ProductManagement } from "./product-management"
import { OrderManagement } from "./order-management"
import { InventoryManagement } from "./inventory-management"
import { StoreSettings } from "./store-settings"
import { Analytics } from "./analytics"

type DashboardView = "overview" | "products" | "orders" | "inventory" | "analytics" | "settings"

export function DashboardContent() {
  const [currentView, setCurrentView] = useState<DashboardView>("overview")

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "inventory":
        return <InventoryManagement />
      case "analytics":
        return <Analytics />
      case "settings":
        return <StoreSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
