"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BrainCircuitIcon, MailIcon, MessageSquareIcon, SendIcon } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset submitted state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Есть вопросы? Мы здесь, чтобы помочь. Свяжитесь с нами, и мы ответим как можно скорее.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MailIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription className="leading-relaxed">Отправьте нам письмо для общих вопросов</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@reminder hub.com" className="text-primary hover:underline">
                  support@reminder hub.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquareIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Поддержка</CardTitle>
                <CardDescription className="leading-relaxed">Нужна техническая помощь?</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:help@reminder hub.com" className="text-primary hover:underline">
                  help@reminder hub.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BrainCircuitIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Бизнес</CardTitle>
                <CardDescription className="leading-relaxed">Для партнерства и сотрудничества</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:business@reminder hub.com" className="text-primary hover:underline">
                  business@reminder hub.com
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Отправить сообщение</CardTitle>
              <CardDescription>Заполните форму ниже, и мы свяжемся с вами в ближайшее время</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <SendIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
                  <p className="text-muted-foreground">Спасибо за обращение. Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ivan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input
                      id="subject"
                      placeholder="Как мы можем помочь?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <textarea
                      id="message"
                      placeholder="Расскажите нам подробнее..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                    {!isSubmitting && <SendIcon className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>Часто задаваемые вопросы</CardTitle>
              <CardDescription>Возможно, мы уже ответили на ваш вопрос</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Как начать работу с reminder  hub?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Просто зарегистрируйтесь бесплатно, подключите свои мессенджеры и начните получать интеллектуальные
                  напоминания автоматически.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Какие мессенджеры поддерживаются?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы поддерживаем Telegram, Slack, WhatsApp и Discord с дополнительными платформами, которые будут
                  добавлены в будущем.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Безопасны ли мои данные?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Да! Мы используем сквозное шифрование и безопасность корпоративного уровня для защиты всех ваших
                  данных.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <BrainCircuitIcon className="h-6 w-6 text-primary" />
              <span>reminder  hub</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 reminder  hub. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Конфиденциальность
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Условия
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
