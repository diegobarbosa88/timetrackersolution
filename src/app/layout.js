'use client';

import '../styles/globals.css';
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sistema de Control de Tiempo</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-light-gray">
        <div className="flex flex-col min-h-screen">
          <header className="navbar">
            <div className="container navbar-container">
              <div className="navbar-logo">Sistema de Control de Tiempo</div>
              <nav>
                <ul className="navbar-menu">
                  <li className="navbar-item">
                    <a href="/" className="navbar-link active">Inicio</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/dashboard" className="navbar-link">Dashboard</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/reports" className="navbar-link">Informes</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/admin/employees" className="navbar-link">Empleados</a>
                  </li>
                </ul>
              </nav>
              <div>
                <a href="/auth/login" className="btn btn-primary">Iniciar Sesión</a>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-primary-dark text-white p-4">
            <div className="container">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1">&copy; {new Date().getFullYear()} TimeTracker - Todos los derechos reservados</p>
                  <p className="text-sm">Sistema de Control de Tiempo para Empresas</p>
                </div>
                <div>
                  <a href="/terms" className="text-white mr-3">Términos</a>
                  <a href="/privacy" className="text-white mr-3">Privacidad</a>
                  <a href="/contact" className="text-white">Contacto</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
