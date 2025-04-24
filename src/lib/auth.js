'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulación de autenticación
      if (username === 'admin' && password === 'admin123') {
        const userData = {
          id: 'admin-001',
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      } else if (username === 'EMP001' && password === 'emp123') {
        const userData = {
          id: 'EMP001',
          name: 'Empleado Demo',
          email: 'empleado@example.com',
          role: 'employee'
        };
        
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      } else {
        setError('Credenciales inválidas');
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (err) {
      setError(err.message || 'Error de autenticación');
      return { success: false, error: err.message || 'Error de autenticación' };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    try {
      // Añadir un pequeño retraso para evitar problemas de hidratación
      const timer = setTimeout(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error al cargar usuario:', err);
      setError(err.message || 'Error al cargar usuario');
      setLoading(false);
    }
  }, []);

  // Valor del contexto
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
