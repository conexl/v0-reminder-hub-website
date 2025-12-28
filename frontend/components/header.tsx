"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Динамическая загрузка мобильного меню только при необходимости
const MobileMenu = dynamic(() => import("./mobile-menu").then((mod) => ({ default: mod.MobileMenu })), {
  ssr: false,
})

export function Header() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Логотип — увеличена тач-область */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl z-10 min-h-12 px-2 -ml-2"
          aria-label="Перейти на главную страницу Tecta"
        >
          <Image 
            src="/images/icon.svg" 
            alt=""  // alt пустой — логотип декоративный, текст рядом
            width={32} 
            height={32} 
            className="h-8 w-8"
            priority
          />
          <span className="text-balance">Tecta</span>
        </Link>

        {/* Десктопная навигация по центру */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          <Link href="/features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Возможности
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Дашборд
          </Link>
          <Link href="/analytics" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Аналитика
          </Link>
          <Link href="/integrations" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Интеграции
          </Link>
        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-2 z-10">
          {/* Переключатель темы */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12"  // 48×48 px
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              aria-label="Переключить тему"
            >
              {currentTheme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </Button>
          )}

          <Link href="/login" className="hidden sm:inline-block">
            <Button variant="ghost">Войти</Button>
          </Link>
          <Link href="/register" className="hidden sm:inline-block">
            <Button>Начать</Button>
          </Link>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            <MobileMenu open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </header>
  )
}