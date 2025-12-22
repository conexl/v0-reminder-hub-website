"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserIcon, BellIcon, ShieldCheckIcon, PaletteIcon, CheckIcon } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Product manager and AI enthusiast",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false,
    overdueReminders: true,
    extractedTasks: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground leading-relaxed">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
              <TabsTrigger value="profile">
                <UserIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <BellIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <PaletteIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="security">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">We'll email you to verify the change</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        placeholder="Tell us about yourself"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                      {!isSaving && <CheckIcon className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Permanent account actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border-2 border-destructive/20 p-4">
                    <h3 className="font-semibold mb-2">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Report</Label>
                        <p className="text-sm text-muted-foreground">Get a weekly summary of your productivity</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Overdue Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get notified about overdue tasks</p>
                      </div>
                      <Switch
                        checked={notifications.overdueReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, overdueReminders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Extracted Tasks</Label>
                        <p className="text-sm text-muted-foreground">Notify when AI extracts new tasks from chats</p>
                      </div>
                      <Switch
                        checked={notifications.extractedTasks}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, extractedTasks: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Preferences</CardTitle>
                  <CardDescription>Customize your application experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Choose your preferred color theme</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select
                        value={preferences.dateFormat}
                        onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-4">Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={security.twoFactorAuth}
                          onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="space-y-2">
                        <Label>Session Timeout</Label>
                        <Select
                          value={security.sessionTimeout}
                          onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Automatically log out after period of inactivity
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Security Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Last active: Now</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}
