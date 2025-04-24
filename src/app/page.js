'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth';

// Componente de carga con tiempo de espera máximo
const LoadingComponent = ({ timeout = 10000 }) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (timedOut) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Error de carga</h1>
        <p className="mb-4">La aplicación tardó demasiado en cargar. Por favor, intenta recargar la página.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Recargar página
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Sistema de Control de Tiempo</h1>
      <div className="animate-pulse text-lg mb-4">Cargando...</div>
      <div className="w-16 h-16 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    // Marcar la carga inicial como completa después de un breve retraso
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Solo redirigir si la carga inicial está completa y la autenticación no está en proceso
    if (initialLoadComplete && !loading) {
      if (user) {
        // Si el usuario está autenticado, redirigir al dashboard
        router.push('/dashboard');
      } else if (error) {
        // Si hay un error de autenticación, mostrar la página normalmente
        console.error('Error de autenticación:', error);
      }
    }
  }, [user, loading, error, router, initialLoadComplete]);

  // Si está cargando o la redirección está pendiente, mostrar el componente de carga
  if (loading || (user && initialLoadComplete)) {
    return <LoadingComponent />;
  }

  // Contenido principal de la página de inicio
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">TimeTracker</h1>
          <p className="text-xl mb-8">Sistema de seguimiento de tiempo para empleados</p>
          <div className="flex space-x-4">
            <a href="/auth/login" className="bg-white text-purple-700 hover:bg-gray-100 font-bold py-2 px-4 rounded">
              Iniciar Sesión
            </a>
            <button onClick={() => router.push('/auth/login')} className="border border-white text-white hover:bg-purple-800 font-bold py-2 px-4 rounded">
              Conocer Más
            </button>
          </div>
        </div>
      </header>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Control de Tiempo</h3>
              <p>Registra entradas y salidas de empleados con precisión y facilidad.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Informes Detallados</h3>
              <p>Genera informes de asistencia, horas trabajadas y rendimiento.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Gestión de Empleados</h3>
              <p>Administra perfiles, departamentos y permisos de empleados.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Comienza a gestionar el tiempo de tus empleados de manera eficiente</h2>
          <a href="/auth/login" className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full">
            Ir al Dashboard
          </a>
        </div>
      </section>
    </div>
  );
}
