"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer } from "@/components/ui/chart"
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
  Tooltip,
} from "recharts"
import { TrendingUpIcon, TrendingDownIcon, CheckCircleIcon, AlertCircleIcon, MessageSquareIcon, ClockIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"

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
  const [chartColors, setChartColors] = useState({
    chart1: "#6366f1",
    chart2: "#06b6d4",
    chart3: "#10b981",
    chart4: "#8b5cf6",
  })
  const [stats, setStats] = useState<{
    summary: {
      totalTasks: number
      completedTasks: number
      pendingTasks: number
      overdueTasks: number
      completionRate: number
      avgResponseTime: number
    }
    byMessenger?: Array<{
      platform: string
      totalTasks: number
      completedTasks: number
      aiExtracted: number
    }>
    completionTrend?: Array<{
      date: string
      completed: number
      pending: number
      aiExtracted: number
    }>
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadStats()
    
    const computeColors = () => {
      const style = getComputedStyle(document.documentElement)
      setChartColors({
        chart1: style.getPropertyValue("--color-chart-1").trim() || "#6366f1",
        chart2: style.getPropertyValue("--color-chart-2").trim() || "#06b6d4",
        chart3: style.getPropertyValue("--color-chart-3").trim() || "#10b981",
        chart4: style.getPropertyValue("--color-chart-4").trim() || "#8b5cf6",
      })
    }

    computeColors()

    const observer = new MutationObserver(computeColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const loadStats = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await api.getReminderStats("month")
      if (response.success && response.data) {
        setStats(response.data)
      } else {
        setError(response.error?.message || "Не удалось загрузить статистику")
      }
    } catch (err) {
      setError("Ошибка при загрузке данных")
      console.error("Failed to load stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const platformData = stats?.byMessenger?.map((m, idx) => ({
    platform: m.platform,
    tasks: m.totalTasks,
    color: [chartColors.chart1, chartColors.chart2, chartColors.chart3, chartColors.chart4][idx] || chartColors.chart1,
  })) || []

  const COLORS = [chartColors.chart1, chartColors.chart2, chartColors.chart3, chartColors.chart4]

  // Transform completion trend data for charts
  const completionData = stats?.completionTrend?.map((item) => ({
    month: new Date(item.date).toLocaleDateString("ru-RU", { month: "short" }),
    completed: item.completed,
    pending: item.pending,
  })) || []

  const totalTasks = stats?.summary.totalTasks || 0
  const completedTasks = stats?.summary.completedTasks || 0
  const completionRate = stats?.summary.completionRate || 0
  const avgResponseTime = stats?.summary.avgResponseTime || 0

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

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка статистики...</p>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Процент выполнения</CardDescription>
                    <CardTitle className="text-3xl">{Math.round(completionRate)}%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <TrendingUpIcon className="h-4 w-4" />
                      <span>За текущий период</span>
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
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Завершено: {completedTasks}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Ср. время ответа</CardDescription>
                    <CardTitle className="text-3xl">{avgResponseTime}м</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ClockIcon className="h-4 w-4" />
                      <span>Среднее время</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Активные платформы</CardTitle>
                    <CardDescription>{platformData.length}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {platformData.map((p) => (
                        <Badge key={p.platform} variant="secondary" className="text-xs">
                          {p.platform}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Тренд выполнения задач</CardTitle>
                <CardDescription>Ежемесячные завершенные и ожидающие задачи за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={completionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis tick={{ fill: "hsl(var(--foreground))" }} tickLine={{ stroke: "hsl(var(--border))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="square" />
                      <Bar dataKey="completed" fill={chartColors.chart1} radius={[4, 4, 0, 0]} name="Завершено" />
                      <Bar dataKey="pending" fill={chartColors.chart2} radius={[4, 4, 0, 0]} name="В ожидании" />
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
                        label={({ platform, tasks, percent }) =>
                          `${platform}: ${tasks} (${(percent * 100).toFixed(0)}%)`
                        }
                        labelLine={{ stroke: "hsl(var(--foreground))", strokeWidth: 1 }}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Среднее время ответа</CardTitle>
                <CardDescription>Время от сообщения до создания задачи (в минутах)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[]} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis tick={{ fill: "hsl(var(--foreground))" }} tickLine={{ stroke: "hsl(var(--border))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgTime"
                        stroke={chartColors.chart1}
                        strokeWidth={3}
                        dot={{ fill: chartColors.chart1, r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Время (мин)"
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
                  {[
                    { name: "Высокий", value: 0 },
                    { name: "Средний", value: 0 },
                    { name: "Низкий", value: 0 },
                  ].filter(p => p.value > 0).map((priority, index) => (
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
                                    ? chartColors.chart2
                                    : chartColors.chart3,
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
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
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
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-sm">
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
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
