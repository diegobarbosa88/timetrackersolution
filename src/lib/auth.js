'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      // Simulación de autenticación (reemplazar con llamada real a API)
      if (credentials.role === 'admin' && credentials.username === 'admin' && credentials.password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else if (credentials.role === 'employee' && credentials.username === 'EMP001' && credentials.password === 'emp123') {
        const userData = {
          id: '2',
          name: 'Empleado',
          email: 'empleado@example.com',
          role: 'employee'
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  // Verificar si hay un usuario guardado al cargar
  useEffect(() => {
    const checkUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al verificar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      checkUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Valores del contexto
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// HOC para proteger rutas
export function withAuth(Component, requiredRole = 'any') {
  function AuthenticatedComponent(props) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [clientSide, setClientSide] = useState(false);

    useEffect(() => {
      setClientSide(true);
    }, []);

    useEffect(() => {
      if (clientSide && !loading) {
        if (!isAuthenticated) {
          router.push('/auth/login');
        } else if (requiredRole !== 'any' && user?.role !== requiredRole) {
          router.push('/dashboard');
        }
      }
    }, [isAuthenticated, loading, router, user, clientSide, requiredRole]);

    if (loading || !clientSide) {
      return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    if (requiredRole !== 'any' && user?.role !== requiredRole) {
      return null;
    }

    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}
