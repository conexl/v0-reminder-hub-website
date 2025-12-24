"use client"

import Link from "next/link"
import Image from "next/image"
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
  HomeIcon,
  BarChart3Icon,
  MessageSquareIcon,
  SettingsIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
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
          {mounted && (
            <Image
              src={currentTheme === "dark" ? "/images/icon-dark-32x32.png" : "/images/icon-light-32x32.png"}
              alt="Reminder Hub Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          )}
          <span>Reminder Hub</span>
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
              <Button variant="ghost" size="icon" className="relative">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 py-5 border-b bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <SheetTitle className="text-xl font-bold flex items-center gap-2">
                      {mounted && (
                        <Image
                          src={currentTheme === "dark" ? "/images/icon-dark-32x32.png" : "/images/icon-light-32x32.png"}
                          alt="Logo"
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      )}
                      Меню
                    </SheetTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
                    </div>
                  </div>
                </SheetHeader>

                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <HomeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Дашборд</span>
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
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <SettingsIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span>Настройки</span>
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <Button
                      variant="destructive"
                      className="w-full h-12 text-base font-medium justify-start"
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-destructive-foreground/10 mr-3">
                        <LogOutIcon className="h-5 w-5" />
                      </div>
                      Выйти из аккаунта
                    </Button>
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
