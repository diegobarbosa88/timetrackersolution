'use client';

import React from 'react';

export default function HomePage() {
  return (
    <main className="container py-5">
      <section className="text-center mb-5">
        <h1 className="mb-3">Sistema de Control de Tiempo</h1>
        <p className="mb-4 text-lg">
          Comienza a gestionar el tiempo de tus empleados de manera eficiente
        </p>
        <div className="flex justify-center gap-3">
          <a href="/auth/login" className="btn btn-primary">Iniciar Sesión</a>
        </div>
      </section>
      
      <section className="mb-5">
        <h2 className="text-center mb-4">Características Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="card-header">
              <div className="text-primary mb-2">⏱️</div>
              <h3 className="card-title">Control de Tiempo</h3>
            </div>
            <div className="card-body">
              <p>Registra entradas y salidas de empleados con precisión y facilidad.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="text-primary mb-2">📊</div>
              <h3 className="card-title">Informes Detallados</h3>
            </div>
            <div className="card-body">
              <p>Genera informes de asistencia, horas trabajadas y rendimiento.</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="text-primary mb-2">👥</div>
              <h3 className="card-title">Gestión de Empleados</h3>
            </div>
            <div className="card-body">
              <p>Administra perfiles, departamentos y permisos de empleados.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-primary-dark text-white p-5 rounded-lg mb-5">
        <h2 className="text-center mb-4">Comienza a gestionar el tiempo de tus empleados de manera eficiente</h2>
        <div className="text-center">
          <a href="/auth/login" className="btn btn-secondary">Iniciar Ahora</a>
        </div>
      </section>
    </main>
  );
}
