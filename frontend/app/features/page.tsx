"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BrainCircuitIcon,
  MessageSquareIcon,
  BellIcon,
  BarChartIcon,
  ShieldCheckIcon,
  ZapIcon,
  ClockIcon,
  UsersIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react"

const features = [
  {
    icon: BrainCircuitIcon,
    title: "ИИ-извлечение задач",
    description:
      "Передовые алгоритмы машинного обучения автоматически распознают и извлекают задачи, обязательства и дедлайны из ваших сообщений мессенджеров.",
    benefits: [
      "Обработка на естественном языке",
      "Распознавание контекста",
      "Многоязычная поддержка",
      "Обучение со временем",
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: MessageSquareIcon,
    title: "Интеграция мессенджеров",
    description:
      "Подключайтесь к любимым платформам мессенджеров. Поддерживаем Telegram, Slack, WhatsApp и Discord с бесшовной синхронизацией в реальном времени.",
    benefits: [
      "Мониторинг в реальном времени",
      "Несколько платформ",
      "Личные и групповые чаты",
      "Безопасное подключение",
    ],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BellIcon,
    title: "Умные напоминания",
    description:
      "Никогда не пропускайте дедлайн с интеллектуальными напоминаниями. Получайте своевременные уведомления через выбранные вами каналы.",
    benefits: [
      "Настраиваемые уведомления",
      "Мультиканальные оповещения",
      "Приоритетные напоминания",
      "Напоминания на основе местоположения",
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: BarChartIcon,
    title: "Аналитика и инсайты",
    description:
      "Получайте подробную информацию о своей продуктивности с помощью комплексных дашбордов аналитики и визуализации данных.",
    benefits: [
      "Отслеживание продуктивности",
      "Анализ трендов выполнения",
      "Производительность платформ",
      "Настраиваемые отчеты",
    ],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: ShieldCheckIcon,
    title: "Безопасность и конфиденциальность",
    description:
      "Ваши данные защищены шифрованием на уровне предприятия и строгими мерами конфиденциальности. Соответствует GDPR.",
    benefits: [
      "Сквозное шифрование",
      "Соответствие GDPR",
      "Контроль конфиденциальности данных",
      "Безопасное хранилище",
    ],
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: ZapIcon,
    title: "Автоматизация",
    description:
      "Автоматизируйте свой рабочий процесс с помощью умных правил и триггеров. Создавайте задачи, назначайте приоритеты и управляйте дедлайнами автоматически.",
    benefits: [
      "Пользовательские правила автоматизации",
      "Умные триггеры",
      "Автоматическая категоризация",
      "Интеграция рабочего процесса",
    ],
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
]

const useCases = [
  {
    title: "Для руководителей проектов",
    description:
      "Отслеживайте все обязательства команды в групповых чатах и автоматически создавайте задачи с назначением и дедлайнами.",
    icon: UsersIcon,
  },
  {
    title: "Для фрилансеров",
    description:
      "Управляйте обязательствами перед несколькими клиентами из разных каналов связи в одном централизованном месте.",
    icon: ClockIcon,
  },
  {
    title: "Для команд",
    description:
      "Убедитесь, что ничего не упущено в быстрых обсуждениях команды с автоматическим отслеживанием задач, управляемым ИИ.",
    icon: SparklesIcon,
  },
]

const plans = [
  {
    name: "Бесплатный",
    price: "₽0",
    period: "/месяц",
    description: "Идеально для личного использования",
    features: [
      "1 интеграция мессенджера",
      "До 50 задач/месяц",
      "Базовая аналитика",
      "Мобильное приложение",
      "Поддержка электронной почты",
    ],
    cta: "Начать бесплатно",
    highlighted: false,
  },
  {
    name: "Профессиональный",
    price: "₽990",
    period: "/месяц",
    description: "Для профессионалов и фрилансеров",
    features: [
      "Неограниченные интеграции",
      "Неограниченные задачи",
      "Расширенная аналитика",
      "Приоритетная поддержка",
      "Пользовательские правила автоматизации",
      "Интеграция API",
    ],
    cta: "Начать пробный период",
    highlighted: true,
  },
  {
    name: "Команда",
    price: "₽2990",
    period: "/месяц",
    description: "Для команд и организаций",
    features: [
      "Все из Профессионального",
      "Управление командой",
      "Рабочее пространство для совместной работы",
      "Расширенная безопасность",
      "Выделенный менеджер по работе с клиентами",
      "SLA поддержка 24/7",
    ],
    cta: "Связаться с отделом продаж",
    highlighted: false,
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge className="mb-4">Возможности</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Мощные функции для
            <span className="text-primary"> бесшовного </span>
            управления задачами
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Откройте для себя, как Tecta использует искусственный интеллект для преобразования ваших разговоров в
            мессенджерах в организованные, действенные задачи
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all group">
                  <CardHeader>
                    <div className={`h-14 w-14 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Идеально подходит для</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Как Tecta помогает различным профессионалам оставаться организованными
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <Card key={index} className="text-center border-2">
                  <CardHeader>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{useCase.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{useCase.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

{/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Простые, прозрачные цены</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Выберите план, который подходит для ваших потребностей
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-start">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`
                  relative flex flex-col h-full transition-all duration-300 ease-in-out border-2
                  ${
                    plan.highlighted
                      ? "border-primary shadow-xl scale-105 z-10 hover:shadow-2xl hover:scale-[1.07]"
                      : "hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 hover:bg-muted/20"
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="text-xs px-3 py-1 shadow-sm">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-2 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-balance">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="w-full mt-auto">
                    <Button 
                      className={`w-full transition-all duration-300 ${plan.highlighted ? 'shadow-md hover:shadow-lg' : ''}`} 
                      variant={plan.highlighted ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Готовы трансформировать управление задачами?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Присоединяйтесь к тысячам профессионалов, которые уже используют Tecta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="min-w-[200px]">
                Начать бесплатно
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
                Связаться с отделом продаж
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
