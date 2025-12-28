import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Политика конфиденциальности</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Последнее обновление: 22 декабря 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Сбор информации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы собираем информацию, которую вы предоставляете непосредственно нам, когда вы создаете аккаунт,
                подключаете мессенджеры или используете наши услуги. Это включает:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Информацию об аккаунте: имя, адрес электронной почты и пароль</li>
                <li>Данные профиля: биография, настройки и предпочтения</li>
                <li>Данные мессенджеров: сообщения, метаданные чата и извлеченные задачи</li>
                <li>Данные об использовании: информация о том, как вы используете наш сервис</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Использование информации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Мы используем собранную информацию для:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Предоставления, поддержки и улучшения наших услуг</li>
                <li>Обработки и выполнения ваших запросов</li>
                <li>Отправки вам технических уведомлений и обновлений</li>
                <li>Ответа на ваши комментарии и вопросы</li>
                <li>Анализа тенденций и мониторинга использования</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Безопасность данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы серьезно относимся к безопасности ваших данных. Мы используем безопасность корпоративного уровня для
                защиты вашей информации:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Сквозное шифрование для всех данных мессенджеров</li>
                <li>Шифрование данных при передаче и хранении</li>
                <li>Регулярные аудиты безопасности и тестирование на проникновение</li>
                <li>Строгие политики контроля доступа</li>
                <li>Двухфакторная аутентификация доступна для всех пользователей</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Обмен данными</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы не продаем вашу личную информацию. Мы можем делиться вашей информацией только в следующих
                ограниченных случаях:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>С вашего согласия или по вашему указанию</li>
                <li>С поставщиками услуг, которые работают от нашего имени</li>
                <li>Для соблюдения законов или реагирования на судебные процессы</li>
                <li>Для защиты наших прав, конфиденциальности, безопасности или собственности</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Ваши права</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>У вас есть право на:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Доступ к вашей личной информации</li>
                <li>Исправление неточных данных</li>
                <li>Запрос удаления ваших данных</li>
                <li>Отказ от определенных способов использования ваших данных</li>
                <li>Экспорт ваших данных в переносимом формате</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Хранение данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы храним вашу информацию только до тех пор, пока это необходимо для предоставления вам наших услуг и
                как описано в этой политике конфиденциальности. Когда вы удаляете свой аккаунт, мы удаляем ваши
                персональные данные и данные мессенджеров в течение 30 дней.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Файлы cookie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы используем файлы cookie и аналогичные технологии отслеживания для отслеживания активности в нашем
                сервисе и хранения определенной информации. Вы можете настроить свой браузер на отклонение всех файлов
                cookie или на указание, когда отправляется файл cookie.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Если у вас есть вопросы об этой Политике конфиденциальности, пожалуйста, свяжитесь с нами:</p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: privacy@tecta.com</li>
                <li>Адрес: 123 Privacy Street, San Francisco, CA 94105</li>
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
