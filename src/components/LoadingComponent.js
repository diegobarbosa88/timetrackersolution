'use client';

import React from 'react';
import { useAuth } from '../lib/auth';

// Componente de carga para mostrar mientras se verifica la autenticación
export default function LoadingComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

// Componente de envoltura para manejar la autenticación del lado del cliente
export function ClientAuthWrapper({ children, requireAuth = false }) {
  // Verificar si estamos en el cliente
  const isClient = typeof window !== 'undefined';
  
  // Si estamos en el servidor durante la construcción estática, renderizar un placeholder
  if (!isClient) {
    return <div>Cargando aplicación...</div>;
  }
  
  // Usar el hook de autenticación (solo en el cliente)
  const { user, loading } = useAuth();
  
  // Mostrar componente de carga mientras se verifica la autenticación
  if (loading) {
    return <LoadingComponent />;
  }
  
  // Si se requiere autenticación y no hay usuario, redirigir a login
  if (requireAuth && !user) {
    // Usar window.location para navegación del lado del cliente
    if (isClient) {
      window.location.href = '/auth/login';
      return null;
    }
    return <div>Redirigiendo a login...</div>;
  }
  
  // Renderizar los hijos si todo está bien
  return <>{children}</>;
}
