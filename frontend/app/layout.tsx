// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ 
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://xorx.dev"),

  title: {
    default: "Tecta — AI Brain for Task Automation",
    template: "%s | Tecta",
  },
  description:
    "Искусственный интеллект для автоматического извлечения задач из мессенджеров. Поддержка Telegram, Slack, WhatsApp, Discord и других платформ. Умные напоминания и аналитика.",
  keywords: [
    "AI задачи",
    "искусственный интеллект",
    "автоматизация задач",
    "Telegram бот",
    "Slack интеграция",
    "WhatsApp задачи",
    "Discord напоминания",
    "менеджер задач",
    "умные напоминания",
    "продуктивность",
  ],
  authors: [{ name: "XORX Team" }],
  creator: "XORX",
  publisher: "XORX",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://xorx.dev",
    title: "Tecta — AI Brain for Task Automation",
    description: "Автоматическое извлечение задач из мессенджеров с помощью искусственного интеллекта",
    siteName: "XORX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tecta — AI-powered brain circuit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecta — AI Brain for Task Automation",
    description: "Автоматическое извлечение задач из мессенджеров с помощью ИИ",
    images: ["/og-image.png"],
    creator: "@xorxdev", 
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
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/icon.svg", color: "#3B82F6" },
    ],
  },

  manifest: "/manifest.json",
  alternates: {
    canonical: "https://xorx.dev",
  },

  generator: "Next.js",
  
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  
  other: {
    "format-detection": "telephone=no",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}