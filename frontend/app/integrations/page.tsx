"use client"

import { useState, useEffect } from "react"
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
import { api, type Integration } from "@/lib/api"

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
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [newIntegration, setNewIntegration] = useState({
    botToken: "",
    analyzePrivateChats: true,
    analyzeGroups: true,
  })

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await api.getIntegrations()
      if (response.success && response.data) {
        setIntegrations(response.data.integrations)
      } else {
        setError(response.error?.message || "Не удалось загрузить интеграции")
      }
    } catch (err) {
      setError("Ошибка при загрузке данных")
      console.error("Failed to load integrations:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddIntegration = async () => {
    if (!selectedPlatform || !newIntegration.botToken) {
      setError("Выберите платформу и введите токен бота")
      return
    }

    try {
      const response = await api.createIntegration({
        platform: selectedPlatform as "telegram" | "slack" | "discord" | "whatsapp",
        credentials: {
          botToken: newIntegration.botToken,
        },
        settings: {
          analyzePrivateChats: newIntegration.analyzePrivateChats,
          analyzeGroups: newIntegration.analyzeGroups,
          autoCreateReminders: true,
        },
      })

      if (response.success && response.data) {
        setIntegrations((prev) => [...prev, response.data!.integration])
        setIsAddDialogOpen(false)
        setSelectedPlatform(null)
        setNewIntegration({ botToken: "", analyzePrivateChats: true, analyzeGroups: true })
        setError("")
      } else {
        setError(response.error?.message || "Не удалось создать интеграцию")
      }
    } catch (err) {
      setError("Ошибка при создании интеграции")
      console.error("Failed to create integration:", err)
    }
  }

  const handleConfigureIntegration = (integration: any) => {
    setSelectedIntegration(integration)
    setIsConfigureDialogOpen(true)
  }

  const handleSaveConfiguration = () => {
    if (!selectedIntegration) return

    setIntegrations(
      integrations.map((int) =>
        int.id === selectedIntegration.id ? { ...int, settings: selectedIntegration.settings || {} } : int,
      ),
    )
    setIsConfigureDialogOpen(false)
    setSelectedIntegration(null)
  }

  const handleDeleteIntegration = async (id: string) => {
    try {
      const response = await api.deleteIntegration(id)
      if (response.success) {
        setIntegrations((prev) => prev.filter((i) => i.id !== id))
      } else {
        setError(response.error?.message || "Не удалось удалить интеграцию")
      }
    } catch (err) {
      setError("Ошибка при удалении интеграции")
      console.error("Failed to delete integration:", err)
    }
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
            <h1 className="text-3xl font-bold mb-2">Интеграции мессенджеров</h1>
            <p className="text-muted-foreground leading-relaxed">
              Подключите платформы для автоматического извлечения задач из разговоров
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка интеграций...</p>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Подключенные платформы</CardDescription>
                <CardTitle className="text-3xl">{integrations.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Активные подключения мессенджеров</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Отслеживаемые чаты</CardDescription>
                <CardTitle className="text-3xl">
                  {integrations.reduce((sum, int) => sum + (int.monitoredChatsCount || 0), 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">На всех платформах</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Извлечено задач</CardDescription>
                <CardTitle className="text-3xl text-primary">
                  {integrations.reduce((sum, int) => sum + (int.tasksExtracted || 0), 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Всего задач, извлеченных ИИ</div>
              </CardContent>
            </Card>
          </div>

          {/* Connected Integrations */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Подключенные платформы</CardTitle>
                  <CardDescription>Управление активными интеграциями мессенджеров</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircleIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Пока нет интеграций</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Подключите первую платформу мессенджера, чтобы начать извлекать задачи
                  </p>
                </div>
              ) : (
                integrations.map((integration) => (
                  <Card key={integration.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
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
                                  {integration.status === "connected" ? "подключено" : "отключено"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{integration.username}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Отслеживаемые чаты</div>
                                <div className="font-semibold">{integration.monitoredChatsCount || 0}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Извлечено задач</div>
                                <div className="font-semibold text-primary">{integration.tasksExtracted || 0}</div>
                              </div>
                              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                                <div className="text-muted-foreground">Настройки</div>
                                <div className="flex gap-2 mt-1">
                                  {(integration.settings as { analyzePrivateChats?: boolean })?.analyzePrivateChats && (
                                    <Badge variant="secondary" className="text-xs">
                                      Личные
                                    </Badge>
                                  )}
                                  {(integration.settings as { analyzeGroups?: boolean })?.analyzeGroups && (
                                    <Badge variant="secondary" className="text-xs">
                                      Группы
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start">
                          <Button variant="outline" size="sm" onClick={() => handleConfigureIntegration(integration)}>
                            <SettingsIcon className="h-4 w-4 mr-2" />
                            Настроить
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteIntegration(integration.id)}>
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
              <CardTitle>Добавить новую платформу</CardTitle>
              <CardDescription>Выберите платформу мессенджера для подключения</CardDescription>
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
                                Подключено
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
                  Подключить {selectedPlatform && availablePlatforms.find((p) => p.id === selectedPlatform)?.name}
                </DialogTitle>
                <DialogDescription>Настройте параметры интеграции мессенджера</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="botToken">Токен бота / Учетные данные</Label>
                  <Input
                    id="botToken"
                    placeholder={`Введите токен бота ${selectedPlatform}`}
                    value={newIntegration.botToken}
                    onChange={(e) => setNewIntegration({ ...newIntegration, botToken: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Получите токен бота на портале разработчика {selectedPlatform}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Анализировать личные чаты</Label>
                      <p className="text-xs text-muted-foreground">Извлекать задачи из личных разговоров</p>
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
                      <Label>Анализировать групповые чаты</Label>
                      <p className="text-xs text-muted-foreground">Отслеживать групповые разговоры для задач</p>
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
                  Отмена
                </Button>
                <Button onClick={handleAddIntegration} disabled={!newIntegration.botToken}>
                  Подключить платформу
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Configure Integration Dialog */}
          <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Настроить {selectedIntegration?.platform}</DialogTitle>
                <DialogDescription>Измените параметры интеграции</DialogDescription>
              </DialogHeader>

              {selectedIntegration && (
                <div className="space-y-4 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Анализировать личные чаты</Label>
                        <p className="text-xs text-muted-foreground">Извлекать задачи из личных разговоров</p>
                      </div>
                      <Switch
                        checked={(selectedIntegration.settings as { analyzePrivateChats?: boolean })?.analyzePrivateChats || false}
                        onCheckedChange={(checked) =>
                          setSelectedIntegration({
                            ...selectedIntegration,
                            settings: { ...(selectedIntegration.settings as Record<string, unknown> || {}), analyzePrivateChats: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Анализировать групповые чаты</Label>
                        <p className="text-xs text-muted-foreground">Отслеживать групповые разговоры для задач</p>
                      </div>
                      <Switch
                        checked={Boolean((selectedIntegration.settings as { analyzeGroups?: boolean })?.analyzeGroups)}
                        onCheckedChange={(checked) => {
                          const currentSettings = (selectedIntegration.settings as Record<string, unknown>) || {}
                          setSelectedIntegration({
                            ...selectedIntegration,
                            settings: { ...currentSettings, analyzeGroups: checked },
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveConfiguration}>Сохранить изменения</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
