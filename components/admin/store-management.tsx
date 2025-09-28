"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Search, Edit, Eye } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Store } from "@/lib/database/types"

export function StoreManagement() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchStores() {
      try {
        const { data: stores } = await supabase
          .from("stores")
          .select(`
            *,
            tenants (
              name
            )
          `)
          .order("created_at", { ascending: false })

        setStores(stores || [])
      } catch (error) {
        console.error("Error fetching stores:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [supabase])

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.contact_email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all stores on the platform</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStores.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No stores found</p>
            ) : (
              filteredStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={store.logo_url || "/placeholder.svg?height=60&width=60"}
                      alt={store.name}
                      className="w-15 h-15 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{store.name}</h3>
                      <p className="text-sm text-gray-600">Tenant: {store.tenants?.name || "No tenant"}</p>
                      <p className="text-sm text-gray-600">Contact: {store.contact_email || "No email"}</p>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(store.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={store.is_active ? "default" : "secondary"}>
                      {store.is_active ? "Active" : "Inactive"}
                    </Badge>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
