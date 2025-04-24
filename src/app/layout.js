'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../lib/auth';
import LoadingComponent from '../components/LoadingComponent';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
    // Dar tiempo para que los estilos se carguen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Si no estamos en el cliente, mostrar un esqueleto básico
  if (!isClient) {
    return (
      <html lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TimeTracker - Sistema de Control de Tiempo</title>
          <meta name="description" content="Sistema de control de tiempo para empleados" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Sistema de Control de Tiempo</h1>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TimeTracker - Sistema de Control de Tiempo</title>
        <meta name="description" content="Sistema de control de tiempo para empleados" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          {isLoading ? (
            <LoadingComponent message="Inicializando aplicación..." />
          ) : (
            <>
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
