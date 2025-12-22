"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  InstagramIcon as TelegramIcon,
  SlackIcon,
  MessageSquareIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  SettingsIcon,
  TrashIcon,
  AlertCircleIcon,
} from "lucide-react"

// Mock data based on API
const mockIntegrations = [
  {
    id: "int_msg_123",
    platform: "telegram",
    username: "@reminder_bot",
    status: "connected",
    monitoredChatsCount: 12,
    tasksExtracted: 85,
    settings: {
      analyzePrivateChats: true,
      analyzeGroups: true,
    },
  },
  {
    id: "int_msg_456",
    platform: "slack",
    username: "Workspace: Tech Team",
    status: "connected",
    monitoredChatsCount: 8,
    tasksExtracted: 42,
    settings: {
      analyzePrivateChats: true,
      analyzeGroups: true,
    },
  },
]

const availablePlatforms = [
  {
    id: "telegram",
    name: "Telegram",
    icon: TelegramIcon,
    description: "Connect your Telegram bot to monitor chats and extract tasks",
    color: "text-blue-500",
  },
  {
    id: "slack",
    name: "Slack",
    icon: SlackIcon,
    description: "Integrate with your Slack workspace for team task management",
    color: "text-purple-500",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageSquareIcon,
    description: "Monitor WhatsApp conversations for commitments and deadlines",
    color: "text-green-500",
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageSquareIcon,
    description: "Connect Discord servers to track tasks from your community",
    color: "text-indigo-500",
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(mockIntegrations)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [newIntegration, setNewIntegration] = useState({
    botToken: "",
    analyzePrivateChats: true,
    analyzeGroups: true,
  })

  const handleAddIntegration = () => {
    if (!selectedPlatform) return

    const integration = {
      id: `int_msg_${Date.now()}`,
      platform: selectedPlatform,
      username: `@new_${selectedPlatform}_bot`,
      status: "connected",
      monitoredChatsCount: 0,
      tasksExtracted: 0,
      settings: {
        analyzePrivateChats: newIntegration.analyzePrivateChats,
        analyzeGroups: newIntegration.analyzeGroups,
      },
    }

    setIntegrations([...integrations, integration])
    setIsAddDialogOpen(false)
    setSelectedPlatform(null)
    setNewIntegration({ botToken: "", analyzePrivateChats: true, analyzeGroups: true })
  }

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((i) => i.id !== id))
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = availablePlatforms.find((p) => p.id === platform)
    const Icon = platformData?.icon || MessageSquareIcon
    return <Icon className={`h-5 w-5 ${platformData?.color || ""}`} />
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messenger Integrations</h1>
            <p className="text-muted-foreground leading-relaxed">
              Connect your messaging platforms to automatically extract tasks from conversations
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Connected Platforms</CardDescription>
                <CardTitle className="text-3xl">{integrations.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Active messenger connections</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Monitored Chats</CardDescription>
                <CardTitle className="text-3xl">
                  {integrations.reduce((sum, int) => sum + int.monitoredChatsCount, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Across all platforms</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tasks Extracted</CardDescription>
                <CardTitle className="text-3xl text-primary">
                  {integrations.reduce((sum, int) => sum + int.tasksExtracted, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Total AI-extracted tasks</div>
              </CardContent>
            </Card>
          </div>

          {/* Connected Integrations */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Platforms</CardTitle>
                  <CardDescription>Manage your active messenger integrations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircleIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No integrations yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your first messenger platform to start extracting tasks
                  </p>
                </div>
              ) : (
                integrations.map((integration) => (
                  <Card key={integration.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {getPlatformIcon(integration.platform)}
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg capitalize">{integration.platform}</h3>
                                <Badge variant={integration.status === "connected" ? "default" : "destructive"}>
                                  {integration.status === "connected" ? (
                                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  ) : (
                                    <XCircleIcon className="h-3 w-3 mr-1" />
                                  )}
                                  {integration.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{integration.username}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Monitored Chats</div>
                                <div className="font-semibold">{integration.monitoredChatsCount}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Tasks Extracted</div>
                                <div className="font-semibold text-primary">{integration.tasksExtracted}</div>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <div className="text-muted-foreground">Settings</div>
                                <div className="flex gap-2 mt-1">
                                  {integration.settings.analyzePrivateChats && (
                                    <Badge variant="secondary" className="text-xs">
                                      Private
                                    </Badge>
                                  )}
                                  {integration.settings.analyzeGroups && (
                                    <Badge variant="secondary" className="text-xs">
                                      Groups
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <SettingsIcon className="h-4 w-4" />
                            Configure
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteIntegration(integration.id)}
                          >
                            <TrashIcon className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Available Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Platform</CardTitle>
              <CardDescription>Choose a messaging platform to connect</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {availablePlatforms.map((platform) => {
                const Icon = platform.icon
                const isConnected = integrations.some((i) => i.platform === platform.id)

                return (
                  <Card
                    key={platform.id}
                    className={`border-2 hover:border-primary/50 transition-all cursor-pointer ${
                      isConnected ? "opacity-50" : ""
                    }`}
                    onClick={() => {
                      if (!isConnected) {
                        setSelectedPlatform(platform.id)
                        setIsAddDialogOpen(true)
                      }
                    }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className={`h-6 w-6 ${platform.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{platform.name}</h3>
                            {isConnected && (
                              <Badge variant="secondary" className="text-xs">
                                Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
                        </div>
                        {!isConnected && <PlusIcon className="h-5 w-5 text-muted-foreground" />}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </CardContent>
          </Card>

          {/* Add Integration Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Connect {selectedPlatform && availablePlatforms.find((p) => p.id === selectedPlatform)?.name}
                </DialogTitle>
                <DialogDescription>Configure your messenger integration settings</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="botToken">Bot Token / Credentials</Label>
                  <Input
                    id="botToken"
                    placeholder={`Enter your ${selectedPlatform} bot token`}
                    value={newIntegration.botToken}
                    onChange={(e) => setNewIntegration({ ...newIntegration, botToken: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your bot token from the {selectedPlatform} developer portal
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analyze Private Chats</Label>
                      <p className="text-xs text-muted-foreground">Extract tasks from private conversations</p>
                    </div>
                    <Switch
                      checked={newIntegration.analyzePrivateChats}
                      onCheckedChange={(checked) =>
                        setNewIntegration({ ...newIntegration, analyzePrivateChats: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analyze Group Chats</Label>
                      <p className="text-xs text-muted-foreground">Monitor group conversations for tasks</p>
                    </div>
                    <Switch
                      checked={newIntegration.analyzeGroups}
                      onCheckedChange={(checked) => setNewIntegration({ ...newIntegration, analyzeGroups: checked })}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIntegration} disabled={!newIntegration.botToken}>
                  Connect Platform
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </AuthGuard>
  )
}
