'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingComponent() {
  const [dots, setDots] = useState('');
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    // Animación de puntos suspensivos
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);
    
    // Mostrar mensaje de error después de 10 segundos
    const errorTimeout = setTimeout(() => {
      setShowError(true);
    }, 10000);
    
    return () => {
      clearInterval(dotsInterval);
      clearTimeout(errorTimeout);
    };
  }, []);
  
  const handleReload = () => {
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {!showError ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cargando{dots}</h2>
          <p className="text-gray-500">Por favor espere mientras cargamos su contenido</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">La carga está tomando más tiempo de lo esperado</h2>
          <p className="text-gray-500 mb-4">Puede haber un problema de conexión o con el servidor</p>
          <button 
            onClick={handleReload}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      )}
    </div>
  );
}
