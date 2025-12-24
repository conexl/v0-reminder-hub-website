import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://reminder-hub.com"),
  title: {
    default: "Reminder Hub - AI-ассистент для управления задачами из мессенджеров",
    template: "%s | Reminder Hub",
  },
  description:
    "Автоматически извлекайте задачи и дедлайны из ваших разговоров в мессенджерах с помощью AI. Поддержка Telegram, Slack, WhatsApp и Discord. Интеллектуальное управление напоминаниями с аналитикой.",
  keywords: [
    "AI задачи",
    "управление напоминаниями",
    "Telegram боты",
    "Slack интеграция",
    "WhatsApp задачи",
    "Discord напоминания",
    "искусственный интеллект",
    "автоматизация задач",
    "менеджер задач",
    "умные напоминания",
  ],
  authors: [{ name: "Reminder Hub Team" }],
  creator: "Reminder Hub",
  publisher: "Reminder Hub",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://reminder-hub.com",
    title: "Reminder Hub - AI-ассистент для управления задачами",
    description: "Автоматически извлекайте задачи из мессенджеров с помощью искусственного интеллекта",
    siteName: "Reminder Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reminder Hub - AI-powered task management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reminder Hub - AI-ассистент для управления задачами",
    description: "Автоматически извлекайте задачи из мессенджеров с помощью искусственного интеллекта",
    images: ["/og-image.png"],
    creator: "@reminderhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/images/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/images/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/images/icon-light-32x32.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/images/icon.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://reminder-hub.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
