'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Definir interfaz para el tipo de empleado
interface EmployeeType {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  startDate?: string;
  status: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
  [key: string]: any; // Para permitir acceso dinámico a propiedades
}

export default function EditEmployeePage() {
  const searchParams = useSearchParams();
  const employeeId = searchParams?.get('id') || '';
  
  const [employeeData, setEmployeeData] = useState<EmployeeType>({
    id: '',
    name: '',
    email: '',
    department: '',
    position: '',
    startDate: '',
    status: 'active'
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Cargar datos del empleado
  useEffect(() => {
    if (!employeeId) {
      setError('ID de empleado no proporcionado');
      setLoading(false);
      return;
    }

    try {
      // Intentar obtener del localStorage
      const storedEmployees = localStorage.getItem('timetracker_employees');
      
      if (storedEmployees) {
        const employees: EmployeeType[] = JSON.parse(storedEmployees);
        const employee = employees.find(emp => emp.id === employeeId);
        
        if (employee) {
          setEmployeeData(employee);
        } else {
          setError('Empleado no encontrado');
        }
      } else {
        setError('No hay datos de empleados disponibles');
      }
    } catch (err) {
      console.error('Error al cargar datos del empleado:', err);
      setError('Error al cargar datos del empleado');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const formData = new FormData(e.currentTarget);
      const updatedEmployee: EmployeeType = {
        ...employeeData,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        department: formData.get('department') as string,
        position: formData.get('position') as string,
        startDate: formData.get('startDate') as string,
        status: formData.get('status') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        emergencyContact: formData.get('emergencyContact') as string,
        notes: formData.get('notes') as string
      };
      
      // Actualizar en localStorage
      const storedEmployees = localStorage.getItem('timetracker_employees');
      
      if (storedEmployees) {
        const employees: EmployeeType[] = JSON.parse(storedEmployees);
        const updatedEmployees = employees.map(emp => 
          emp.id === employeeId ? updatedEmployee : emp
        );
        
        localStorage.setItem('timetracker_employees', JSON.stringify(updatedEmployees));
        setSuccess(true);
        
        // Actualizar datos mostrados
        setEmployeeData(updatedEmployee);
        
        // Redirigir después de un breve retraso
        setTimeout(() => {
          window.location.href = '/admin/employees';
        }, 1500);
      } else {
        setError('No se pudieron encontrar los datos de empleados para actualizar');
      }
    } catch (err) {
      console.error('Error al actualizar empleado:', err);
      setError('Error al actualizar empleado');
    }
  };

  // Manejar eliminación de empleado
  const handleDeleteEmployee = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer.')) {
      try {
        const storedEmployees = localStorage.getItem('timetracker_employees');
        
        if (storedEmployees) {
          const employees: EmployeeType[] = JSON.parse(storedEmployees);
          const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
          
          localStorage.setItem('timetracker_employees', JSON.stringify(updatedEmployees));
          
          alert('Empleado eliminado correctamente');
          window.location.href = '/admin/employees';
        } else {
          setError('No se pudieron encontrar los datos de empleados para eliminar');
        }
      } catch (err) {
        console.error('Error al eliminar empleado:', err);
        setError('Error al eliminar empleado');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Cargando datos del empleado...</p>
        </div>
      </div>
    );
  }

  if (error && !employeeData.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <a href="/admin/employees" className="text-blue-500 hover:text-blue-700">
            Volver a la lista de empleados
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Empleado</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">¡Actualizado!</p>
          <p>Los datos del empleado se han actualizado correctamente.</p>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
              ID
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" 
              id="id" 
              type="text" 
              value={employeeData.id}
              disabled
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="name" 
              name="name"
              type="text" 
              defaultValue={employeeData.name}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="email" 
              name="email"
              type="email" 
              defaultValue={employeeData.email}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Estado
            </label>
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="status"
              name="status"
              defaultValue={employeeData.status}
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="vacation">Vacaciones</option>
              <option value="leave">Permiso</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
              Departamento
            </label>
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="department"
              name="department"
              defaultValue={employeeData.department}
              required
            >
              <option value="Operaciones">Operaciones</option>
              <option value="Administración">Administración</option>
              <option value="Ventas">Ventas</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Marketing">Marketing</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
              Cargo
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="position" 
              name="position"
              type="text" 
              defaultValue={employeeData.position}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Fecha de Inicio
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="startDate" 
              name="startDate"
              type="date"
              defaultValue={employeeData.startDate}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="phone" 
              name="phone"
              type="tel" 
              defaultValue={employeeData.phone || ''}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Dirección
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="address" 
              name="address"
              type="text" 
              defaultValue={employeeData.address || ''}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContact">
              Contacto de Emergencia
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="emergencyContact" 
              name="emergencyContact"
              type="text" 
              defaultValue={employeeData.emergencyContact || ''}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
              Notas
            </label>
            <textarea 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="notes" 
              name="notes"
              rows={3}
              defaultValue={employeeData.notes || ''}
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              <a 
                href="/admin/employees" 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </a>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
                onClick={handleDeleteEmployee}
              >
                Eliminar
              </button>
            </div>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
