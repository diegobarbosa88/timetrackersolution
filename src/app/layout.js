'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../lib/auth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TimeTracker - Sistema de Control de Tiempo</title>
        <meta name="description" content="Sistema de control de tiempo para empleados" />
        <link rel="icon" href="/favicon.ico" />
        {/* Asegurarse de que los estilos se carguen correctamente */}
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        <link rel="stylesheet" href="/_next/static/css/app/globals.css" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
