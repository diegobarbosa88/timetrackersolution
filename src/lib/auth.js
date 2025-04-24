'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../components/LoadingComponent';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Cargar estado de autenticación al montar el componente
  useEffect(() => {
    try {
      // Añadir un pequeño retraso para evitar problemas de hidratación
      const timer = setTimeout(() => {
        const storedUser = localStorage.getItem('timetracker_user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            setIsAdmin(parsedUser.role === 'admin');
          } catch (error) {
            console.error('Error al cargar usuario:', error);
            localStorage.removeItem('timetracker_user');
            setError('Error al cargar datos de usuario');
          }
        }
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error al inicializar autenticación:', err);
      setError('Error al inicializar autenticación');
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validar credenciales
      if (userData.role === 'admin') {
        // Credenciales de administrador
        if (userData.username === 'admin' && userData.password === 'admin123') {
          const adminUser = {
            id: 'ADMIN001',
            name: 'Administrador',
            role: 'admin',
            email: 'admin@magneticplace.com'
          };
          setUser(adminUser);
          setIsAuthenticated(true);
          setIsAdmin(true);
          localStorage.setItem('timetracker_user', JSON.stringify(adminUser));
          return { success: true };
        }
      } else if (userData.role === 'employee') {
        // Credenciales de empleado
        // Buscar en la lista de empleados
        const storedEmployees = localStorage.getItem('timetracker_employees');
        if (storedEmployees) {
          const employees = JSON.parse(storedEmployees);
          const employee = employees.find(emp => 
            emp.id === userData.username && emp.password === userData.password
          );
          
          if (employee) {
            const employeeUser = {
              id: employee.id,
              name: employee.name,
              role: 'employee',
              email: employee.email,
              department: employee.department
            };
            setUser(employeeUser);
            setIsAuthenticated(true);
            setIsAdmin(false);
            localStorage.setItem('timetracker_user', JSON.stringify(employeeUser));
            return { success: true };
          }
        }
        
        // Verificar empleados predefinidos
        if (userData.username === 'EMP001' && userData.password === 'emp123') {
          const employeeUser = {
            id: 'EMP001',
            name: 'Carlos Rodríguez',
            role: 'employee',
            email: 'carlos.rodriguez@magneticplace.com',
            department: 'Operaciones'
          };
          setUser(employeeUser);
          setIsAuthenticated(true);
          setIsAdmin(false);
          localStorage.setItem('timetracker_user', JSON.stringify(employeeUser));
          return { success: true };
        }
      }
      
      // Credenciales inválidas
      setError('Credenciales inválidas');
      return { success: false, error: 'Credenciales inválidas' };
    } catch (err) {
      console.error('Error durante el login:', err);
      setError('Error durante el login: ' + (err.message || 'Error desconocido'));
      return { success: false, error: 'Error durante el login' };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('timetracker_user');
    router.push('/auth/login');
  };

  // Función para verificar si un usuario tiene acceso a una ruta
  const hasAccess = (route) => {
    if (!isAuthenticated) return false;
    
    // Rutas de administrador
    if (route.startsWith('/admin') && !isAdmin) return false;
    
    return true;
  };

  // Valor del contexto
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    hasAccess,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Componente de orden superior para proteger rutas
export function withAuth(Component, requiredRole = 'any') {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isAdmin, user, loading, error } = useAuth();
    const router = useRouter();
    const [clientSide, setClientSide] = useState(false);
    
    // Verificar si estamos en el cliente
    useEffect(() => {
      setClientSide(true);
    }, []);
    
    // Si estamos cargando, mostrar componente de carga
    if (loading || !clientSide) {
      return <LoadingComponent />;
    }
    
    // Si hay un error, mostrar mensaje de error
    if (error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Error de autenticación</h1>
          <p className="mb-4 text-gray-600">{error}</p>
          <button 
            onClick={() => router.push('/auth/login')} 
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Ir a login
          </button>
        </div>
      );
    }
    
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated && clientSide) {
      router.push('/auth/login');
      return <LoadingComponent message="Redirigiendo a login..." />;
    }
    
    // Verificar el rol requerido
    if (requiredRole === 'admin' && !isAdmin && clientSide) {
      router.push('/dashboard');
      return <LoadingComponent message="Redirigiendo a dashboard..." />;
    }
    
    // Si todo está bien, renderizar el componente protegido
    return <Component {...props} />;
  };
}

// Exportación por defecto para asegurar compatibilidad
export default { useAuth, AuthProvider, withAuth };
