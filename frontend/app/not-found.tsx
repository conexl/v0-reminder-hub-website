// app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Фон с градиентом и лёгким glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-sidebar to-background opacity-80" />

      {/* Анимированный "404" */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-9xl font-bold tracking-tighter text-primary"
      >
        404
      </motion.h1>

      {/* Текст с glow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 mt-4 text-2xl font-medium text-muted-foreground"
      >
        Страница не найдена
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 mt-2 text-lg text-muted-foreground"
      >
        Кажется, ты забрёл в цифровой туман...
      </motion.p>

      {/* Кнопка "Вернуться" с hover-эффектом */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 mt-10"
      >
        <Link
          href="/"
          className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          <span className="relative z-10">Вернуться на главную</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary to-accent transition-transform group-hover:translate-x-0" />
        </Link>
      </motion.div>

      {/* Декоративные элементы: "нейроны" или частицы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
      </div>
    </div>
  );
}