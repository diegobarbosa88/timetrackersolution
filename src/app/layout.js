'use client';

import './globals.css';
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sistema de Control de Tiempo</title>
        {/* Asegurar que los estilos se carguen correctamente */}
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" precedence="default" />
      </head>
      <body className="min-h-screen bg-white">
        <div className="flex flex-col min-h-screen">
          <header className="bg-purple-700 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Sistema de Control de Tiempo</h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} TimeTracker - Todos los derechos reservados
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
