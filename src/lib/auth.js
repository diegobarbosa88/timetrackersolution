'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación que maneja el estado de autenticación
export function AuthProvider({ children }) {
  // Estado para el usuario y carga
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      // Simulación de autenticación
      if (email === 'admin@example.com' && password === 'password') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      console.error('Error durante el login:', error);
      return { success: false, error: error.message || 'Error de autenticación' };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    // Esta función solo debe ejecutarse en el cliente
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al recuperar usuario:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // En el servidor, simplemente marcar como no cargando
      setLoading(false);
    }
  }, []);

  // Valor del contexto
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  // Verificar si estamos en el cliente
  const isClient = typeof window !== 'undefined';
  
  // Usar el contexto solo si estamos en el cliente
  const context = isClient ? useContext(AuthContext) : null;
  
  // Si estamos en el servidor durante la construcción estática, devolver valores predeterminados
  if (!isClient) {
    return {
      user: null,
      loading: false,
      login: () => {},
      logout: () => {},
      isAuthenticated: false
    };
  }
  
  // Verificar si el contexto existe
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}

// Función para verificar autenticación en el servidor
export function getServerAuthSession() {
  // En un entorno real, esto verificaría tokens JWT, cookies, etc.
  // Para nuestra simulación, siempre devolvemos null en el servidor
  return null;
}

// Función para verificar si una ruta requiere autenticación
export function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    
    // Si estamos en el cliente y cargando, mostrar un indicador de carga
    if (typeof window !== 'undefined' && loading) {
      return <div>Cargando...</div>;
    }
    
    // Si estamos en el cliente y no hay usuario autenticado, redirigir a login
    if (typeof window !== 'undefined' && !user) {
      // Usar window.location para navegación del lado del cliente
      window.location.href = '/auth/login';
      return null;
    }
    
    // Si estamos en el servidor o hay un usuario autenticado, renderizar el componente
    return <Component {...props} />;
  };
}
