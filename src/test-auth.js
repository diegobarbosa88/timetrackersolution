// Este archivo es para verificar que la implementación de autenticación funcione correctamente
// Ejecuta este script para probar la exportación e importación de la función withAuth

'use client';

import React from 'react';
import { useAuth, withAuth } from '../lib/auth';

// Componente de prueba simple
function TestComponent() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Componente de prueba</h1>
      <p>Usuario autenticado: {user ? user.name : 'No autenticado'}</p>
    </div>
  );
}

// Probar la función withAuth con diferentes roles
const TestWithAny = withAuth(TestComponent, 'any');
const TestWithAdmin = withAuth(TestComponent, 'admin');
const TestWithEmployee = withAuth(TestComponent, 'employee');

// Exportar los componentes de prueba
export { TestWithAny, TestWithAdmin, TestWithEmployee };

// Función principal de prueba
export default function TestAuthImplementation() {
  return (
    <div>
      <h1>Prueba de implementación de autenticación</h1>
      <p>Si puedes ver este mensaje, la función withAuth se está exportando correctamente.</p>
    </div>
  );
}
