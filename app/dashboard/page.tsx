"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  MoreVerticalIcon,
  PlusIcon,
  InstagramIcon as TelegramIcon,
  SlackIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  TrashIcon,
  EditIcon,
  AlertCircleIcon,
} from "lucide-react"

// Mock data based on API documentation
const mockReminders = [
  {
    id: "rem_1",
    title: "Созвон по дизайну",
    description: "Обсудить правки из чата с Артемом",
    dueDate: "2025-01-15T10:00:00Z",
    status: "pending",
    priority: "high",
    source: "messenger",
    messengerMetadata: {
      platform: "telegram",
      chatName: "Design Team",
      sender: "@artem_designer",
      messageLink: "https://t.me/c/123/456",
    },
  },
  {
    id: "rem_2",
    title: "Review project proposal",
    description: "Check the updated proposal from marketing team",
    dueDate: "2025-01-16T14:00:00Z",
    status: "pending",
    priority: "medium",
    source: "messenger",
    messengerMetadata: {
      platform: "slack",
      chatName: "Marketing",
      sender: "@sarah",
      messageLink: "https://slack.com/archives/123",
    },
  },
  {
    id: "rem_3",
    title: "Team standup meeting",
    description: "Daily sync with development team",
    dueDate: "2025-01-14T09:00:00Z",
    status: "completed",
    priority: "low",
    source: "messenger",
    messengerMetadata: {
      platform: "discord",
      chatName: "Dev Team",
      sender: "@john_dev",
      messageLink: "https://discord.com/channels/123",
    },
  },
  {
    id: "rem_4",
    title: "Finish quarterly report",
    description: "Complete and submit Q4 financial report",
    dueDate: "2025-01-20T17:00:00Z",
    status: "pending",
    priority: "high",
    source: "messenger",
    messengerMetadata: {
      platform: "whatsapp",
      chatName: "Finance",
      sender: "+1234567890",
      messageLink: null,
    },
  },
  {
    id: "rem_5",
    title: "Update documentation",
    description: "Add new API endpoints to docs",
    dueDate: "2025-01-13T12:00:00Z",
    status: "overdue",
    priority: "medium",
    source: "messenger",
    messengerMetadata: {
      platform: "telegram",
      chatName: "Tech Team",
      sender: "@mike_tech",
      messageLink: "https://t.me/c/789/012",
    },
  },
]

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "telegram":
      return <TelegramIcon className="h-4 w-4" />
    case "slack":
      return <SlackIcon className="h-4 w-4" />
    default:
      return <MessageSquareIcon className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "overdue":
      return "destructive"
    default:
      return "secondary"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    default:
      return "outline"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState(mockReminders)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  })
  const [activeTab, setActiveTab] = useState("all")
  const filteredReminders = reminders.filter((r) => r.status === activeTab)

  const pendingReminders = reminders.filter((r) => r.status === "pending")
  const completedReminders = reminders.filter((r) => r.status === "completed")
  const overdueReminders = reminders.filter((r) => r.status === "overdue")

  const handleCompleteReminder = (id: string) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, status: "completed" } : r)))
  }

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id))
  }

  const handleCreateReminder = () => {
    const reminder = {
      id: `rem_${Date.now()}`,
      ...newReminder,
      status: "pending",
      source: "manual",
      messengerMetadata: null,
    }
    setReminders([...reminders, reminder as any])
    setIsCreateDialogOpen(false)
    setNewReminder({ title: "", description: "", dueDate: "", priority: "medium" })
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Всего напоминаний</CardDescription>
                <CardTitle className="text-3xl">{reminders.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Активные и завершенные задачи</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Ожидают</CardDescription>
                <CardTitle className="text-3xl text-primary">{pendingReminders.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Ожидают выполнения</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Просрочено</CardDescription>
                <CardTitle className="text-3xl text-destructive">{overdueReminders.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Требуют немедленного внимания</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Завершено</CardDescription>
                <CardTitle className="text-3xl text-green-600">{completedReminders.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Успешно выполнено</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">Все ({reminders.length})</TabsTrigger>
                <TabsTrigger value="pending">Ожидают ({pendingReminders.length})</TabsTrigger>
                <TabsTrigger value="overdue">Просрочено ({overdueReminders.length})</TabsTrigger>
                <TabsTrigger value="completed">Завершено ({completedReminders.length})</TabsTrigger>
              </TabsList>

              <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto">
                <PlusIcon className="h-4 w-4" />
                Новое напоминание
              </Button>
            </div>

            <TabsContent value="all" className="space-y-4">
              {filteredReminders.length === 0 ? (
                <div className="text-center py-12">
                  <BellIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет напоминаний</h3>
                  <p className="text-sm text-muted-foreground">Добавьте новое напоминание.</p>
                </div>
              ) : (
                filteredReminders.map((reminder) => (
                  <Card key={reminder.id} className="border-2 hover:border-primary/30 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{reminder.title}</h3>
                            <Badge variant={getStatusColor(reminder.status)}>
                              {reminder.status === "pending"
                                ? "ожидает"
                                : reminder.status === "completed"
                                  ? "завершено"
                                  : "просрочено"}
                            </Badge>
                            <Badge variant={getPriorityColor(reminder.priority)}>
                              {reminder.priority === "high"
                                ? "высокий"
                                : reminder.priority === "medium"
                                  ? "средний"
                                  : "низкий"}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">{reminder.description}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              <span>{formatDate(reminder.dueDate)}</span>
                            </div>

                            {reminder.messengerMetadata && (
                              <>
                                <div className="flex items-center gap-1">
                                  {getPlatformIcon(reminder.messengerMetadata.platform)}
                                  <span className="capitalize">{reminder.messengerMetadata.platform}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>{reminder.messengerMetadata.chatName}</span>
                                  <span>•</span>
                                  <span>{reminder.messengerMetadata.sender}</span>
                                </div>
                                {reminder.messengerMetadata.messageLink && (
                                  <a
                                    href={reminder.messengerMetadata.messageLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <ExternalLinkIcon className="h-3 w-3" />
                                    Посмотреть сообщение
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start">
                          {reminder.status !== "completed" && (
                            <Button size="sm" onClick={() => handleCompleteReminder(reminder.id)}>
                              <CheckCircleIcon className="h-4 w-4" />
                              Выполнить
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreVerticalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
                                <EditIcon className="h-4 w-4" />
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuItem variant="destructive" onClick={() => handleDeleteReminder(reminder.id)}>
                                <TrashIcon className="h-4 w-4" />
                                Удалить
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingReminders.length === 0 ? (
                <div className="text-center py-12">
                  <BellIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет ожидающих напоминаний</h3>
                  <p className="text-sm text-muted-foreground">Все выполнено! Отличная работа.</p>
                </div>
              ) : (
                pendingReminders.map((reminder) => (
                  <Card key={reminder.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{reminder.title}</h3>
                            <Badge variant={getPriorityColor(reminder.priority)}>
                              {reminder.priority === "high"
                                ? "высокий"
                                : reminder.priority === "medium"
                                  ? "средний"
                                  : "низкий"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ClockIcon className="h-3 w-3" />
                            <span>{formatDate(reminder.dueDate)}</span>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleCompleteReminder(reminder.id)}>
                          <CheckCircleIcon className="h-4 w-4" />
                          Выполнить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4">
              {overdueReminders.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircleIcon className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет просроченных напоминаний</h3>
                  <p className="text-sm text-muted-foreground">Вы на правильном пути!</p>
                </div>
              ) : (
                overdueReminders.map((reminder) => (
                  <Card key={reminder.id} className="border-2 border-destructive/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertCircleIcon className="h-5 w-5 text-destructive" />
                            <h3 className="font-semibold text-lg">{reminder.title}</h3>
                            <Badge variant="destructive">просрочено</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        </div>
                        <Button size="sm" onClick={() => handleCompleteReminder(reminder.id)}>
                          <CheckCircleIcon className="h-4 w-4" />
                          Выполнить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedReminders.length === 0 ? (
                <div className="text-center py-12">
                  <ClockIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Нет завершенных напоминаний</h3>
                  <p className="text-sm text-muted-foreground">Начните выполнять задачи!</p>
                </div>
              ) : (
                completedReminders.map((reminder) => (
                  <Card key={reminder.id} className="border-2 opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-lg line-through">{reminder.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem variant="destructive" onClick={() => handleDeleteReminder(reminder.id)}>
                              <TrashIcon className="h-4 w-4" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Create Reminder Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Создать новое напоминание</DialogTitle>
                <DialogDescription>Добавьте ручное напоминание в список задач</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    placeholder="Название задачи"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Input
                    id="description"
                    placeholder="Описание задачи"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Срок выполнения</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select
                    value={newReminder.priority}
                    onValueChange={(value) => setNewReminder({ ...newReminder, priority: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateReminder}>Создать напоминание</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View/Edit Reminder Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* View/Edit Reminder Dialog Content */}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </AuthGuard>
  )
}
