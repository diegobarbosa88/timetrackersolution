'use client';

import React, { useState, useEffect } from 'react';

// Componente de carga mejorado con tiempo de espera máximo
const LoadingComponent = ({ timeout = 10000, message = "Cargando..." }) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (timedOut) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Error de carga</h1>
        <p className="mb-4 text-gray-600">La aplicación tardó demasiado en cargar. Por favor, intenta recargar la página.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Recargar página
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Sistema de Control de Tiempo</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingComponent;
