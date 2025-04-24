module.exports = {
  // Configuración básica
  reactStrictMode: false,
  swcMinify: true,
  
  // Ignorar errores durante la compilación
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración experimental
  experimental: {
    appDir: true,
  },
  
  // Variables de entorno
  env: {
    NEXT_DISABLE_STATIC_GENERATION: true,
    NEXT_PUBLIC_RUNTIME_ENV: 'client',
  },
  
  // Configuración para evitar errores de prerenderizado
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true,
  },
  
  // Configuración para resolver módulos externos
  webpack: (config, { isServer }) => {
    // Asegurarse de que webpack pueda resolver los módulos necesarios
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  },
  
  // Configuración para Netlify
  output: 'standalone',
  
  // Desactivar compresión para evitar problemas con Netlify
  compress: false,
  
  // Configuración de rutas
  trailingSlash: false,
  
  // Configuración de exportación estática
  distDir: '.next',
  
  // Configuración de CSS para asegurar que los estilos se carguen correctamente
  optimizeFonts: false,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  
  // Configuración para asegurar que los estilos se carguen correctamente en Netlify
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  
  // Configuración para PostCSS y Tailwind
  postcssLoaderOptions: {
    implementation: require('postcss'),
    postcssOptions: {
      plugins: [
        'tailwindcss',
        'autoprefixer',
      ],
    },
  }
}
