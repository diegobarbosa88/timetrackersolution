/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuración específica para Netlify
  trailingSlash: true,
  
  // Asegurarse de que las rutas dinámicas funcionen correctamente
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // Configuración para imágenes
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // Configuración para la exportación estática
  output: 'standalone',
  
  // Configuración para el entorno de producción
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
  },
  
  // Configuración para evitar errores durante la construcción estática
  experimental: {
    // Permitir componentes del lado del cliente
    appDir: true,
  }
}

module.exports = nextConfig
