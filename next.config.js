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
  
  // Configuración específica para CSS
  webpack: (config) => {
    // Asegurarse de que los archivos CSS se procesen correctamente
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use) && rule.use.some((use) => use.loader?.includes('css-loader')));
    
    if (rules.length > 0) {
      rules.forEach((rule) => {
        rule.use.forEach((use) => {
          if (use.loader?.includes('css-loader') && use.options) {
            use.options.url = false;
            use.options.import = false;
          }
        });
      });
    }
    
    return config;
  },
  
  // Configuración para PostCSS
  postcssLoaderOptions: {
    implementation: require('postcss'),
  },
}

module.exports = nextConfig
