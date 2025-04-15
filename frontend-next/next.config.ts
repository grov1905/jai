/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint durante el build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de TypeScript durante el build
  },
  images: {
    domains: [
      'example.com',
      'tu-dominio-real.com',
      'localhost',
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ],
    remotePatterns: [ // Formato recomendado más reciente
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
      {
        protocol: 'https',
        hostname: '**.tu-dominio-real.com',
      },
    ],
  },

}

export default nextConfig