import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  BrainCircuitIcon,
  MessageSquareIcon,
  BellIcon,
  BarChart3Icon,
  ZapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "lucide-react"

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAgNC40MTgtMy41ODIgOC04IDhzLTgtMy41ODItOC04IDMuNTgyLTggOC04IDggMy41ODIgOCA4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="secondary">
              <SparklesIcon className="mr-1 h-3 w-3" />
              Интеллектуальные задачи на основе ИИ
            </Badge>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Никогда не пропускайте задачи из чатов
            </h1>

            <p className="text-balance text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Tecta использует ИИ для автоматического анализа ваших разговоров в мессенджерах, извлечения обязательств и
              дедлайнов, превращая их в интеллектуальные напоминания.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="text-base">
                  Начать бесплатно
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  Смотреть демо
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium">Поддерживаемые платформы:</span>
              <Badge variant="secondary">Telegram</Badge>
              <Badge variant="secondary">WhatsApp</Badge>
              <Badge variant="secondary">Slack</Badge>
              <Badge variant="secondary">Discord</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-balance text-3xl md:text-5xl font-bold mb-4">Интеллектуальное управление задачами</h2>
            <p className="text-balance text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Перестаньте вручную отслеживать обязательства. Пусть ИИ сделает тяжелую работу.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BrainCircuitIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Извлечение на основе ИИ</CardTitle>
                <CardDescription className="leading-relaxed">
                  Продвинутый ИИ анализирует ваши сообщения и автоматически определяет задачи, сроки и обязательства.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquareIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Мультиплатформенность</CardTitle>
                <CardDescription className="leading-relaxed">
                  Подключайте Telegram, WhatsApp, Slack и Discord. Отслеживайте все разговоры в одном месте.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BellIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Умные напоминания</CardTitle>
                <CardDescription className="leading-relaxed">
                  Получайте своевременные уведомления с полным контекстом, включая ссылки на оригинальные сообщения.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Аналитика продуктивности</CardTitle>
                <CardDescription className="leading-relaxed">
                  Отслеживайте процент выполнения, время ответа и тренды продуктивности на всех платформах.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ZapIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Вебхуки в реальном времени</CardTitle>
                <CardDescription className="leading-relaxed">
                  Интегрируйтесь с вашими инструментами через вебхуки для мгновенных уведомлений и автоматизации.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Безопасность и приватность</CardTitle>
                <CardDescription className="leading-relaxed">
                  Сквозное шифрование с безопасностью корпоративного уровня. Ваши данные остаются приватными.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-balance text-3xl md:text-5xl font-bold mb-4">Как это работает</h2>
            <p className="text-balance text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Начните работу за считанные минуты с нашим простым трёхэтапным процессом.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Подключите мессенджеры</h3>
              <p className="text-muted-foreground leading-relaxed">
                Безопасно свяжите ваши аккаунты Telegram, Slack, WhatsApp или Discord.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">ИИ анализирует чаты</h3>
              <p className="text-muted-foreground leading-relaxed">
                Наш ИИ отслеживает ваши разговоры и автоматически извлекает выполнимые задачи.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Получайте напоминания</h3>
              <p className="text-muted-foreground leading-relaxed">
                Получайте своевременные напоминания с полным контекстом и никогда не пропускайте обязательства.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pt-20 pb-8 px-4">
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
                      className={`w-full transition-all duration-300 ${plan.highlighted ? "shadow-md hover:shadow-lg" : ""}`}
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
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">Готовы никогда не пропускать задачи?</h2>
              <p className="text-balance text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Присоединяйтесь к тысячам профессионалов, которые доверяют Tecta в организации своих задач.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="text-base">
                    Начать бесплатно
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-base bg-transparent">
                    Изучить функции
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />
                  <span>Кредитная карта не требуется</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />
                  <span>14 дней бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-primary" />
                  <span>Отмена в любое время</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Image 
                src="/images/icon.svg" 
                alt="Tecta" 
                width={24} 
                height={24} 
                className="h-6 w-6"
                priority
              />
              <span>Tecta</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Tecta. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Конфиденциальность
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Условия
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </div>
  )
}
