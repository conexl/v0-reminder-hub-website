"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BrainCircuitIcon,
  HomeIcon,
  BarChart3Icon,
  MessageSquareIcon,
  SettingsIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
} from "lucide-react"
import { logout } from "@/lib/auth"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <BrainCircuitIcon className="h-6 w-6 text-primary" />
          <span>Tecta</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            Дашборд
          </Link>
          <Link
            href="/integrations"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <MessageSquareIcon className="h-4 w-4" />
            Интеграции
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <BarChart3Icon className="h-4 w-4" />
            Аналитика
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {currentTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          )}

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <SettingsIcon className="h-4 w-4" />
                    Настройки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOutIcon className="h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <HomeIcon className="h-5 w-5" />
                  Дашборд
                </Link>
                <Link
                  href="/integrations"
                  className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <MessageSquareIcon className="h-5 w-5" />
                  Интеграции
                </Link>
                <Link
                  href="/analytics"
                  className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <BarChart3Icon className="h-5 w-5" />
                  Аналитика
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Настройки
                </Link>
                <div className="border-t pt-4 mt-4">
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => {
                      setOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOutIcon className="h-5 w-5 mr-2" />
                    Выйти
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
