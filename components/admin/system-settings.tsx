"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-2">Configure platform-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platform_name">Platform Name</Label>
              <Input id="platform_name" defaultValue="E-commerce SaaS Platform" placeholder="Enter platform name" />
            </div>

            <div>
              <Label htmlFor="support_email">Support Email</Label>
              <Input
                id="support_email"
                type="email"
                defaultValue="support@platform.com"
                placeholder="Enter support email"
              />
            </div>

            <div>
              <Label htmlFor="maintenance_message">Maintenance Message</Label>
              <Textarea id="maintenance_message" placeholder="Message to display during maintenance" rows={3} />
            </div>

            <Button>Save Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new_registrations">Allow New Registrations</Label>
              <Switch id="new_registrations" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
              <Switch id="maintenance_mode" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="email_notifications">Email Notifications</Label>
              <Switch id="email_notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="analytics_tracking">Analytics Tracking</Label>
              <Switch id="analytics_tracking" defaultChecked />
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
              <Input id="session_timeout" type="number" defaultValue="60" placeholder="Enter session timeout" />
            </div>

            <div>
              <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
              <Input id="max_login_attempts" type="number" defaultValue="5" placeholder="Enter max attempts" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="two_factor_required">Require Two-Factor Authentication</Label>
            <Switch id="two_factor_required" />
          </div>

          <Button>Update Security Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
