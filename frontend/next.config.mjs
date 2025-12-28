/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Оптимизация импортов из больших библиотек
  // Временно отключено из-за возможных конфликтов со стилями
  // experimental: {
  //   optimizePackageImports: [
  //     'lucide-react',
  //   ],
  // },
  // Оптимизация компилятора
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default nextConfig
