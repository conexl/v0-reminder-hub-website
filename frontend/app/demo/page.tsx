"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquareIcon,
  BotIcon,
  CheckCircle2Icon,
  ClockIcon,
  BellIcon,
  ZapIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
} from "lucide-react"

const mockMessages = [
  {
    id: 1,
    platform: "Telegram",
    sender: "Алексей",
    text: "Не забудь отправить отчет до пятницы!",
    time: "10:23",
    extracted: true,
    task: "Отправить отчет",
    priority: "высокий",
    dueDate: "2024-01-19",
  },
  {
    id: 2,
    platform: "Slack",
    sender: "Мария",
    text: "Встреча по проекту перенесена на 15:00",
    time: "11:45",
    extracted: true,
    task: "Встреча по проекту",
    priority: "средний",
    dueDate: "2024-01-15",
  },
  {
    id: 3,
    platform: "WhatsApp",
    sender: "Команда",
    text: "Нужно обновить документацию к следующей неделе",
    time: "14:12",
    extracted: true,
    task: "Обновить документацию",
    priority: "низкий",
    dueDate: "2024-01-22",
  },
]

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= mockMessages.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 3000)
  }

  const stopDemo = () => {
    setIsPlaying(false)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "высокий":
        return "destructive"
      case "средний":
        return "default"
      case "низкий":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Интерактивная демонстрация
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Увидьте reminder  hub <span className="text-primary">в действии</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Наблюдайте, как наш ИИ автоматически извлекает задачи из ваших сообщений в реальном времени
            </p>
          </div>

          {/* Demo Controls */}
          <div className="flex justify-center gap-4 mb-8">
            {!isPlaying && currentStep === 0 ? (
              <Button size="lg" onClick={startDemo} className="gap-2">
                <PlayIcon className="h-5 w-5" />
                Запустить демо
              </Button>
            ) : !isPlaying && currentStep > 0 ? (
              <>
                <Button size="lg" onClick={startDemo} className="gap-2">
                  <PlayIcon className="h-5 w-5" />
                  Продолжить
                </Button>
                <Button size="lg" variant="outline" onClick={resetDemo} className="gap-2 bg-transparent">
                  Сбросить
                </Button>
              </>
            ) : (
              <Button size="lg" variant="outline" onClick={stopDemo} className="gap-2 bg-transparent">
                <PauseIcon className="h-5 w-5" />
                Пауза
              </Button>
            )}
          </div>

          {/* Demo Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Messages Panel */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareIcon className="h-5 w-5 text-primary" />
                  Входящие сообщения
                </CardTitle>
                <CardDescription>Сообщения из подключенных мессенджеров</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMessages.slice(0, currentStep + 1).map((message, index) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                      index === currentStep && isPlaying ? "border-primary bg-primary/5 animate-pulse" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {message.platform}
                        </Badge>
                        <span className="font-medium text-sm">{message.sender}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.extracted && index <= currentStep && (
                      <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-green-600">
                        <CheckCircle2Icon className="h-4 w-4" />
                        <span>Задача извлечена ИИ</span>
                      </div>
                    )}
                  </div>
                ))}

                {currentStep === 0 && !isPlaying && (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquareIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Нажмите "Запустить демо" чтобы увидеть процесс</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tasks Panel */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BotIcon className="h-5 w-5 text-primary" />
                  Извлеченные задачи
                </CardTitle>
                <CardDescription>Автоматически созданные напоминания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMessages.slice(0, currentStep + 1).map((message, index) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                      index === currentStep && isPlaying ? "border-primary bg-primary/5 scale-105" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{message.task}</h4>
                      <Badge variant={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />
                        <span>Срок: {message.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquareIcon className="h-4 w-4" />
                        <span>
                          Из: {message.platform} ({message.sender})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BellIcon className="h-4 w-4" />
                        <span>Уведомления настроены</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground italic">"{message.text}"</p>
                    </div>
                  </div>
                ))}

                {currentStep === 0 && !isPlaying && (
                  <div className="p-8 text-center text-muted-foreground">
                    <BotIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Извлеченные задачи появятся здесь</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ZapIcon className="h-6 w-6 text-primary" />
                Как это работает
              </CardTitle>
              <CardDescription>Технология ИИ-извлечения за кулисами</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="step1" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="step1">Шаг 1</TabsTrigger>
                  <TabsTrigger value="step2">Шаг 2</TabsTrigger>
                  <TabsTrigger value="step3">Шаг 3</TabsTrigger>
                  <TabsTrigger value="step4">Шаг 4</TabsTrigger>
                </TabsList>

                <TabsContent value="step1" className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageSquareIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Получение сообщения</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        reminder  hub подключается к вашим мессенджерам через безопасные API и получает новые сообщения в
                        реальном времени.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="step2" className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BotIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">ИИ-анализ</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Наша передовая модель ИИ анализирует текст сообщения, определяя действия, даты, приоритеты и
                        контекст.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="step3" className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <SparklesIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Создание задачи</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Система автоматически создает структурированную задачу с заголовком, описанием, сроком
                        выполнения и приоритетом.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="step4" className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BellIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Напоминание</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Вы получаете уведомления в нужное время, чтобы никогда не пропустить важные задачи из ваших
                        разговоров.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы попробовать?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Начните использовать reminder  hub бесплатно и никогда больше не упускайте важные задачи
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/register">Начать бесплатно</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/features">Узнать больше</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
