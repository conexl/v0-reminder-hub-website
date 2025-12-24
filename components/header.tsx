"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, BrainCircuitIcon, MenuIcon } from "lucide-react"
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
        {/* Логотип слева */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl z-10">
          <BrainCircuitIcon className="h-6 w-6 text-primary" />
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
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/features"
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Возможности
                </Link>
                <Link
                  href="/dashboard"
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Дашборд
                </Link>
                <Link
                  href="/analytics"
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Аналитика
                </Link>
                <Link
                  href="/integrations"
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Интеграции
                </Link>
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Link href="/login" className="block" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Войти
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={() => setOpen(false)}>
                    <Button className="w-full">Начать</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
