'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../lib/auth';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  
  // Manejar la redirección en el lado del cliente
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth/login';
    }
  }, [user, loading]);

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario y estamos en el cliente, mostrar un contenido mínimo
  // (la redirección se manejará en el useEffect)
  if (!user) {
    return null;
  }

  // Contenido del dashboard para usuarios autenticados
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bienvenido, {user?.name || 'Usuario'}</h2>
        <p className="text-gray-700">
          Este es tu panel de control donde puedes gestionar todas las funciones del sistema.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Empleados</h3>
          <p className="text-gray-600 mb-4">Gestiona la información de los empleados.</p>
          <a href="/admin/employees" className="text-purple-600 hover:text-purple-800">
            Ver empleados →
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Registros de Tiempo</h3>
          <p className="text-gray-600 mb-4">Revisa los registros de entrada y salida.</p>
          <a href="/admin/time-records" className="text-purple-600 hover:text-purple-800">
            Ver registros →
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Informes</h3>
          <p className="text-gray-600 mb-4">Genera informes y estadísticas.</p>
          <a href="/reports" className="text-purple-600 hover:text-purple-800">
            Ver informes →
          </a>
        </div>
      </div>
    </div>
  );
}
