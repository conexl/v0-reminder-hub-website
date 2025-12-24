import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Условия использования</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Последнее обновление: 22 декабря 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Принятие условий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Получая доступ или используя сервис Tecta, вы соглашаетесь соблюдать эти Условия использования.
                Если вы не согласны с какой-либо частью условий, вы не можете использовать наш сервис.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Описание сервиса</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Tecta предоставляет платформу управления задачами на основе ИИ, которая:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Анализирует разговоры в мессенджерах для извлечения задач</li>
                <li>Создает автоматические напоминания с контекстом</li>
                <li>Предоставляет аналитику продуктивности</li>
                <li>Интегрируется с несколькими платформами мессенджеров</li>
                <li>Предлагает возможности настройки и автоматизации</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Аккаунты пользователей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                При создании аккаунта у нас вы должны предоставить точную и полную информацию. Вы несете ответственность
                за:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Сохранение безопасности вашего аккаунта и пароля</li>
                <li>Всю деятельность, которая происходит в вашем аккаунте</li>
                <li>Немедленное уведомление нас о любом несанкционированном использовании</li>
                <li>Обеспечение того, что ваша информация остается точной и актуальной</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Приемлемое использование</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Вы соглашаетесь не использовать Tecta для:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Любых незаконных целей или нарушения любых законов</li>
                <li>Нарушения прав интеллектуальной собственности других лиц</li>
                <li>Передачи вредоносного кода или вирусов</li>
                <li>Попыток получить несанкционированный доступ к нашим системам</li>
                <li>Злоупотребления, преследования или причинения вреда другим пользователям</li>
                <li>Рассылки спама или несогласованных сообщений</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Интеграции мессенджеров</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>При подключении мессенджеров к Tecta:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Вы даете нам разрешение на доступ к вашим сообщениям для анализа ИИ</li>
                <li>Вы соглашаетесь с условиями обслуживания платформы мессенджера</li>
                <li>Вы понимаете, что мы безопасно храним извлеченные данные</li>
                <li>Вы можете отозвать доступ в любое время из настроек</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Оплата и подписки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Для платных функций:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Все сборы оплачиваются заранее и не подлежат возврату</li>
                <li>Подписки автоматически продлеваются, если не отменены</li>
                <li>Мы можем изменять цены с уведомлением за 30 дней</li>
                <li>Вы можете отменить в любое время из настроек аккаунта</li>
                <li>Доступна 14-дневная бесплатная пробная версия для новых пользователей</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Интеллектуальная собственность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Сервис и его оригинальное содержимое, функции и функциональность принадлежат Tecta и защищены
                международными законами об авторском праве, товарных знаках, патентах и других законах об
                интеллектуальной собственности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Прекращение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы можем прекратить или приостановить ваш аккаунт немедленно, без предварительного уведомления, если вы
                нарушаете эти Условия. После прекращения ваше право на использование сервиса немедленно прекращается.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Ограничение ответственности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Tecta предоставляется "как есть" и "как доступно" без каких-либо гарантий. Мы не несем
                ответственности за любые косвенные, случайные или последующие убытки, возникающие в результате
                использования нашего сервиса.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Изменения в условиях</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы оставляем за собой право изменять эти условия в любое время. Мы уведомим пользователей о любых
                существенных изменениях по электронной почте или через наш сервис. Ваше дальнейшее использование после
                таких изменений означает ваше согласие с новыми условиями.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Если у вас есть вопросы об этих Условиях, пожалуйста, свяжитесь с нами:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: legal@tecta.com</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <BrainCircuitIcon className="h-6 w-6 text-primary" />
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
    </div>
  )
}
