"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  SparklesIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  MessageSquareIcon,
  XIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
        <Link href="/" className="flex items-center gap-2 font-bold text-xl z-10">
          <Image src="/images/icon.svg" alt="Tecta Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-balance">Tecta</span>
        </Link>

        {/* Навигация строго по центру - только на десктопе */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          <Link
            href="/features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Возможности
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

        {/* Кнопки справа */}
        <div className="flex items-center gap-2 z-10">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {currentTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          )}
          <Link href="/login" className="hidden sm:inline-block">
            <Button variant="ghost">Войти</Button>
          </Link>
          <Link href="/register" className="hidden sm:inline-block">
            <Button>Начать</Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 py-5 border-b bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-xl font-bold flex items-center gap-2">
                      <Image src="/images/icon.svg" alt="Logo" width={20} height={20} className="h-5 w-5" />
                      Навигация
                    </SheetTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetHeader>

                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                  <div className="space-y-2">
                    <Link
                      href="/features"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <SparklesIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Возможности</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <LayoutDashboardIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Дашборд</span>
                    </Link>

                    <Link
                      href="/analytics"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <BarChart3Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Аналитика</span>
                    </Link>

                    <Link
                      href="/integrations"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MessageSquareIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Интеграции</span>
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t space-y-3">
                    <Link href="/login" className="block" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full h-12 text-base font-medium bg-transparent">
                        Войти
                      </Button>
                    </Link>
                    <Link href="/register" className="block" onClick={() => setOpen(false)}>
                      <Button className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                        Начать бесплатно
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
