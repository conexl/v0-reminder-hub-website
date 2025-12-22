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
            <h1 className="text-3xl font-bold mb-2">Настройки</h1>
            <p className="text-muted-foreground leading-relaxed">Управляйте настройками аккаунта и предпочтениями</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
              <TabsTrigger value="profile">
                <UserIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Профиль</span>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <BellIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Уведомления</span>
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <PaletteIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Предпочтения</span>
              </TabsTrigger>
              <TabsTrigger value="security">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Безопасность</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Информация профиля</CardTitle>
                  <CardDescription>Обновите личную информацию и детали профиля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">ИИ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        Изменить аватар
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF или PNG. Макс. размер 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Полное имя</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email адрес</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Мы отправим вам письмо для подтверждения изменений
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Input
                        id="bio"
                        placeholder="Расскажите о себе"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Сохранение..." : "Сохранить изменения"}
                      {!isSaving && <CheckIcon className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline">Отмена</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Опасная зона</CardTitle>
                  <CardDescription>Постоянные действия с аккаунтом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border-2 border-destructive/20 p-4">
                    <h3 className="font-semibold mb-2">Удалить аккаунт</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      После удаления аккаунта восстановление невозможно. Будьте уверены.
                    </p>
                    <Button variant="destructive" size="sm">
                      Удалить аккаунт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>Выберите, как вы хотите получать уведомления</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Уведомления по email</Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления по электронной почте</p>
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
                        <Label>Push-уведомления</Label>
                        <p className="text-sm text-muted-foreground">Получать push-уведомления на устройства</p>
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
                        <Label>Еженедельный отчет</Label>
                        <p className="text-sm text-muted-foreground">Получать еженедельную сводку продуктивности</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Просроченные напоминания</Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления о просроченных задачах</p>
                      </div>
                      <Switch
                        checked={notifications.overdueReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, overdueReminders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Задачи, извлеченные ИИ</Label>
                        <p className="text-sm text-muted-foreground">
                          Уведомлять, когда ИИ извлекает новые задачи из чатов
                        </p>
                      </div>
                      <Switch
                        checked={notifications.extractedTasks}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, extractedTasks: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Сохранение..." : "Сохранить настройки"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки приложения</CardTitle>
                  <CardDescription>Настройте работу приложения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Тема</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Светлая</SelectItem>
                          <SelectItem value="dark">Темная</SelectItem>
                          <SelectItem value="system">Системная</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Выберите предпочитаемую цветовую тему</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Язык</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">Английский</SelectItem>
                          <SelectItem value="es">Испанский</SelectItem>
                          <SelectItem value="fr">Французский</SelectItem>
                          <SelectItem value="de">Немецкий</SelectItem>
                          <SelectItem value="ru">Русский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Часовой пояс</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Тихоокеанское время (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Горное время (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Центральное время (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Восточное время (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">Центральноевропейское (UTC+1)</SelectItem>
                          <SelectItem value="UTC+3">Московское время (UTC+3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Формат даты</Label>
                      <Select
                        value={preferences.dateFormat}
                        onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">ММ/ДД/ГГГГ</SelectItem>
                          <SelectItem value="DD/MM/YYYY">ДД/ММ/ГГГГ</SelectItem>
                          <SelectItem value="YYYY-MM-DD">ГГГГ-ММ-ДД</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Сохранение..." : "Сохранить настройки"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки безопасности</CardTitle>
                  <CardDescription>Управляйте безопасностью аккаунта и аутентификацией</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-4">Пароль</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Текущий пароль</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Новый пароль</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Обновить пароль</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Двухфакторная аутентификация</Label>
                          <p className="text-sm text-muted-foreground">
                            Добавьте дополнительный уровень безопасности для аккаунта
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
                        <Label>Время ожидания сеанса</Label>
                        <Select
                          value={security.sessionTimeout}
                          onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 минут</SelectItem>
                            <SelectItem value="30">30 минут</SelectItem>
                            <SelectItem value="60">1 час</SelectItem>
                            <SelectItem value="never">Никогда</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Автоматический выход после периода неактивности</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Сохранение..." : "Сохранить настройки безопасности"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активные сеансы</CardTitle>
                  <CardDescription>Управляйте активными сеансами входа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Текущий сеанс</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome на Windows • Последняя активность: сейчас
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Отозвать
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
