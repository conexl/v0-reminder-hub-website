"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BrainCircuitIcon, UserIcon, MailIcon, LockIcon, ArrowRightIcon, CheckIcon } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов")
      setIsLoading(false)
      return
    }

    try {
      const { register } = await import("@/lib/auth")
      const result = await register(email, password, name)
      
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Ошибка при создании аккаунта")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Произошла ошибка при регистрации. Попробуйте позже.")
      setIsLoading(false)
    }
  }

  const passwordStrength = password.length >= 8 ? "strong" : password.length >= 6 ? "medium" : "weak"

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-2">
            <BrainCircuitIcon className="h-7 w-7 text-primary" />
            <span>reminder  hub</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Создайте аккаунт и начните управлять задачами умнее.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Создать аккаунт</CardTitle>
            <CardDescription className="leading-relaxed">
              Присоединяйтесь к тысячам профессионалов, использующих управление задачами на основе ИИ
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Полное имя</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {password && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordStrength === "strong"
                            ? "w-full bg-green-500"
                            : passwordStrength === "medium"
                              ? "w-2/3 bg-yellow-500"
                              : "w-1/3 bg-red-500"
                        }`}
                      />
                    </div>
                    <span className="text-muted-foreground capitalize">
                      {passwordStrength === "strong" ? "сильный" : passwordStrength === "medium" ? "средний" : "слабый"}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-3 w-3 text-primary" />
                  <span>14 дней бесплатно, кредитная карта не требуется</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-3 w-3 text-primary" />
                  <span>Доступ ко всем премиум-функциям</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
                {!isLoading && <ArrowRightIcon className="h-4 w-4" />}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Войти
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Создавая аккаунт, вы соглашаетесь с нашими{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Условиями использования
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Политикой конфиденциальности
          </Link>
        </p>
      </div>
    </div>
  )
}
