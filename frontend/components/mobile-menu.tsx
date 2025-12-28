"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  SparklesIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  MessageSquareIcon,
  XIcon,
} from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
        <SheetTitle className="sr-only">Навигационное меню</SheetTitle>

        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-2">
              <Image src="/images/icon.svg" alt="" width={20} height={20} className="h-5 w-5" />
              <span className="text-xl font-bold">Навигация</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12"
              onClick={() => onOpenChange(false)}
              aria-label="Закрыть меню"
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              <Link
                href="/features"
                className="flex items-center gap-3 px-4 py-4 min-h-12 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                </div>
                <span>Возможности</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-4 min-h-12 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <LayoutDashboardIcon className="h-5 w-5 text-primary" />
                </div>
                <span>Дашборд</span>
              </Link>

              <Link
                href="/analytics"
                className="flex items-center gap-3 px-4 py-4 min-h-12 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BarChart3Icon className="h-5 w-5 text-primary" />
                </div>
                <span>Аналитика</span>
              </Link>

              <Link
                href="/integrations"
                className="flex items-center gap-3 px-4 py-4 min-h-12 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageSquareIcon className="h-5 w-5 text-primary" />
                </div>
                <span>Интеграции</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t space-y-3">
              <Link href="/login" className="block" onClick={() => onOpenChange(false)}>
                <Button variant="outline" className="w-full h-12 text-base font-medium bg-transparent">
                  Войти
                </Button>
              </Link>
              <Link href="/register" className="block" onClick={() => onOpenChange(false)}>
                <Button className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                  Начать бесплатно
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
