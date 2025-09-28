"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface StoreSettings {
  name: string
  description: string
  logo_url: string
  banner_url: string
  contact_email: string
  contact_phone: string
  address: string
}

export function StoreSettings() {
  const [settings, setSettings] = useState<StoreSettings>({
    name: "",
    description: "",
    logo_url: "",
    banner_url: "",
    contact_email: "",
    contact_phone: "",
    address: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchStoreSettings() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { data: profile } = await supabase.from("profiles").select("store_id").eq("id", user.id).single()

        if (!profile?.store_id) return

        const { data: store } = await supabase.from("stores").select("*").eq("id", profile.store_id).single()

        if (store) {
          setSettings({
            name: store.name || "",
            description: store.description || "",
            logo_url: store.logo_url || "",
            banner_url: store.banner_url || "",
            contact_email: store.contact_email || "",
            contact_phone: store.contact_phone || "",
            address: store.address || "",
          })
        }
      } catch (error) {
        console.error("Error fetching store settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStoreSettings()
  }, [supabase])

  const handleSave = async () => {
    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase.from("profiles").select("store_id").eq("id", user.id).single()

      if (!profile?.store_id) return

      await supabase.from("stores").update(settings).eq("id", profile.store_id)

      alert("Settings saved successfully!")
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-600 mt-2">Manage your store information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                placeholder="Enter store name"
              />
            </div>
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                placeholder="Enter contact email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Store Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              placeholder="Describe your store"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                placeholder="Enter contact phone"
              />
            </div>
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={settings.logo_url}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                placeholder="Enter logo URL"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Enter store address"
              rows={2}
            />
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
