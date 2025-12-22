"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, BrainCircuitIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BrainCircuitIcon className="h-6 w-6 text-primary" />
          <span className="text-balance">Reminder Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Возможности
          </Link>
          <Link href="/demo" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Демо
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Дашборд
          </Link>
          <Link
            href="/analytics"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Аналитика
          </Link>
          <Link
            href="/integrations"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Интеграции
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          )}
          <Link href="/login">
            <Button variant="ghost">Войти</Button>
          </Link>
          <Link href="/register">
            <Button>Начать</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
