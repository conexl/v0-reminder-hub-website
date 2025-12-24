/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // ДОБАВИТЬ ЭТО: активирует генерацию статики (папка out)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig