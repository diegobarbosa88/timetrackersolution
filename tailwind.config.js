/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    // Colores
    'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400',
    'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
    'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400',
    'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900',
    'border-purple-50', 'border-purple-100', 'border-purple-200', 'border-purple-300', 'border-purple-400',
    'border-purple-500', 'border-purple-600', 'border-purple-700', 'border-purple-800', 'border-purple-900',
    'hover:bg-purple-50', 'hover:bg-purple-100', 'hover:bg-purple-200', 'hover:bg-purple-300', 'hover:bg-purple-400',
    'hover:bg-purple-500', 'hover:bg-purple-600', 'hover:bg-purple-700', 'hover:bg-purple-800', 'hover:bg-purple-900',
    'focus:ring-purple-50', 'focus:ring-purple-100', 'focus:ring-purple-200', 'focus:ring-purple-300', 'focus:ring-purple-400',
    'focus:ring-purple-500', 'focus:ring-purple-600', 'focus:ring-purple-700', 'focus:ring-purple-800', 'focus:ring-purple-900',
    
    // Animaciones
    'animate-spin', 'animate-pulse',
    
    // Clases básicas de layout
    'container', 'mx-auto', 'px-4', 'py-4', 'py-8', 'flex', 'flex-col', 'flex-grow', 'min-h-screen',
    
    // Clases de texto
    'text-2xl', 'text-xl', 'text-lg', 'text-sm', 'font-bold', 'font-semibold', 'text-center',
    'text-white', 'text-gray-600', 'text-gray-700', 'text-gray-900',
    
    // Clases de fondo
    'bg-white', 'bg-gray-100', 'bg-blue-600', 'bg-red-600', 'bg-green-600',
    'hover:bg-blue-700', 'hover:bg-red-700', 'hover:bg-green-700',
    
    // Clases de borde
    'border', 'border-t', 'border-gray-200', 'border-gray-300', 'rounded-md', 'rounded-lg',
    
    // Clases de espaciado
    'p-6', 'mb-4', 'mb-6', 'mb-8', 'gap-4',
    
    // Clases de sombra
    'shadow-md',
    
    // Clases de tabla
    'min-w-full', 'divide-y', 'divide-gray-200', 'overflow-x-auto',
    
    // Clases de botón
    'py-2', 'px-4', 'py-1', 'px-3',
    
    // Clases de flexbox y grid
    'justify-center', 'items-center', 'grid', 'grid-cols-1', 'md:grid-cols-3',
    
    // Clases de texto
    'uppercase', 'tracking-wider'
  ],
}
