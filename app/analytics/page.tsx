"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUpIcon, TrendingDownIcon, CheckCircleIcon, AlertCircleIcon, MessageSquareIcon } from "lucide-react"

const completionData = [
  { month: "Июл", completed: 65, pending: 35 },
  { month: "Авг", completed: 72, pending: 28 },
  { month: "Сен", completed: 68, pending: 32 },
  { month: "Окт", completed: 78, pending: 22 },
  { month: "Ноя", completed: 82, pending: 18 },
  { month: "Дек", completed: 85, pending: 15 },
]

const platformData = [
  { platform: "Telegram", tasks: 85, color: "hsl(var(--chart-1))" },
  { platform: "Slack", tasks: 42, color: "hsl(var(--chart-2))" },
  { platform: "WhatsApp", tasks: 28, color: "hsl(var(--chart-3))" },
  { platform: "Discord", tasks: 15, color: "hsl(var(--chart-4))" },
]

const responseTimeData = [
  { day: "Пн", avgTime: 45 },
  { day: "Вт", avgTime: 38 },
  { day: "Ср", avgTime: 42 },
  { day: "Чт", avgTime: 35 },
  { day: "Пт", avgTime: 40 },
  { day: "Сб", avgTime: 52 },
  { day: "Вс", avgTime: 48 },
]

const priorityData = [
  { name: "Высокий", value: 35 },
  { name: "Средний", value: 45 },
  { name: "Низкий", value: 20 },
]

const chartConfig = {
  completed: {
    label: "Завершено",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "В ожидании",
    color: "hsl(var(--chart-2))",
  },
  avgTime: {
    label: "Ср. время ответа (мин)",
    color: "hsl(var(--chart-1))",
  },
}

export default function AnalyticsPage() {
  const totalTasks = 170
  const completedTasks = 145
  const completionRate = Math.round((completedTasks / totalTasks) * 100)
  const avgResponseTime = 42

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Аналитика и статистика</h1>
            <p className="text-muted-foreground leading-relaxed">
              Отслеживайте продуктивность и тренды выполнения задач на разных платформах
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Процент выполнения</CardDescription>
                <CardTitle className="text-3xl">{completionRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <TrendingUpIcon className="h-4 w-4" />
                  <span>+5.2% за прошлый месяц</span>
                </div>
                <Progress value={completionRate} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Всего задач</CardDescription>
                <CardTitle className="text-3xl">{totalTasks}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <TrendingUpIcon className="h-4 w-4" />
                  <span>+12 новых на этой неделе</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Ср. время ответа</CardDescription>
                <CardTitle className="text-3xl">{avgResponseTime}м</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <TrendingDownIcon className="h-4 w-4" />
                  <span>На 8м быстрее среднего</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Активные платформы</CardDescription>
                <CardTitle className="text-3xl">4</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Telegram
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Slack
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Тренд выполнения задач</CardTitle>
                <CardDescription>Ежемесячные завершенные и ожидающие задачи за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={completionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Задачи по платформам</CardTitle>
                <CardDescription>Распределение извлеченных задач по мессенджерам</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        dataKey="tasks"
                        nameKey="platform"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={(entry) => `${entry.platform}: ${entry.tasks}`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Среднее время ответа</CardTitle>
                <CardDescription>Время от сообщения до создания задачи (в минутах)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="avgTime"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Распределение приоритетов</CardTitle>
                <CardDescription>Разбивка задач по уровню приоритета</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {priorityData.map((priority, index) => (
                    <div key={priority.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor:
                                priority.name === "Высокий"
                                  ? "hsl(var(--destructive))"
                                  : priority.name === "Средний"
                                    ? "hsl(var(--chart-2))"
                                    : "hsl(var(--chart-3))",
                            }}
                          />
                          <span className="font-medium">{priority.name} приоритет</span>
                        </div>
                        <span className="text-muted-foreground">{priority.value}%</span>
                      </div>
                      <Progress value={priority.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Производительность платформ</CardTitle>
              <CardDescription>Детальные метрики для каждой подключенной платформы мессенджера</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {platformData.map((platform) => (
                  <Card key={platform.platform} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquareIcon className="h-5 w-5" style={{ color: platform.color }} />
                          <CardTitle className="text-lg">{platform.platform}</CardTitle>
                        </div>
                        <Badge variant="secondary">{platform.tasks} задач</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Извлечено</div>
                          <div className="font-semibold text-lg">{platform.tasks}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Завершено</div>
                          <div className="font-semibold text-lg flex items-center gap-1">
                            {Math.round(platform.tasks * 0.85)}
                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Просрочено</div>
                          <div className="font-semibold text-lg flex items-center gap-1">
                            {Math.round(platform.tasks * 0.05)}
                            <AlertCircleIcon className="h-4 w-4 text-destructive" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>Процент выполнения</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthGuard>
  )
}
