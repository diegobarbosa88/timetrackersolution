'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Definir interfaces para los tipos
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

interface TimeRecordType {
  date: string;
  entry: string;
  exit: string;
  total: string;
  status: string;
  isSimulated?: boolean;
}

interface EmployeeStatsType {
  hoursThisMonth: string;
  daysWorked: number;
  punctuality: string;
  extraHours: string;
}

export default function ViewEmployeePage() {
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
  const [timeRecords, setTimeRecords] = useState<TimeRecordType[]>([]);
  const [isUserAddedEmployee, setIsUserAddedEmployee] = useState(false);
  const [employeeStats, setEmployeeStats] = useState<EmployeeStatsType>({
    hoursThisMonth: '0h',
    daysWorked: 0,
    punctuality: '100%',
    extraHours: '0h'
  });

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
          
          // Determinar si es un empleado añadido por el usuario o uno de muestra
          setIsUserAddedEmployee(!employee.id.startsWith('EMP00'));
          
          // Cargar registros de tiempo (reales o simulados)
          loadTimeRecords(employee.id);
          
          // Calcular estadísticas
          calculateEmployeeStats(employee.id);
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

  // Cargar registros de tiempo
  const loadTimeRecords = (empId: string) => {
    try {
      // Intentar obtener registros reales
      const storedRecords = localStorage.getItem(`timetracker_records_${empId}`);
      
      if (storedRecords) {
        const records: TimeRecordType[] = JSON.parse(storedRecords);
        setTimeRecords(records);
      } else {
        // Si no hay registros reales, generar datos simulados para demostración
        if (!empId.startsWith('EMP00')) {
          setTimeRecords([]);
          return;
        }
        
        const simulatedRecords: TimeRecordType[] = generateSimulatedRecords();
        setTimeRecords(simulatedRecords);
      }
    } catch (err) {
      console.error('Error al cargar registros de tiempo:', err);
      setTimeRecords([]);
    }
  };

  // Generar registros simulados para demostración
  const generateSimulatedRecords = (): TimeRecordType[] => {
    const records: TimeRecordType[] = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Solo días laborables (lunes a viernes)
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const entryHour = 8 + Math.floor(Math.random() * 2);
      const entryMinute = Math.floor(Math.random() * 30);
      const hoursWorked = 8 + Math.floor(Math.random() * 2);
      
      const entry = `${entryHour.toString().padStart(2, '0')}:${entryMinute.toString().padStart(2, '0')}`;
      const exitHour = entryHour + hoursWorked;
      const exit = `${exitHour.toString().padStart(2, '0')}:${entryMinute.toString().padStart(2, '0')}`;
      
      records.push({
        date: date.toISOString().split('T')[0],
        entry,
        exit,
        total: `${hoursWorked}h`,
        status: Math.random() > 0.2 ? 'Completado' : 'Parcial',
        isSimulated: true
      });
    }
    
    return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Calcular estadísticas del empleado
  const calculateEmployeeStats = (empId: string) => {
    try {
      // Intentar obtener registros reales
      const storedRecords = localStorage.getItem(`timetracker_records_${empId}`);
      
      if (storedRecords) {
        const records: TimeRecordType[] = JSON.parse(storedRecords);
        
        // Calcular estadísticas reales
        // ... (código para calcular estadísticas reales)
        
        setEmployeeStats({
          hoursThisMonth: '0h', // Actualizar con cálculos reales
          daysWorked: 0,
          punctuality: '100%',
          extraHours: '0h'
        });
      } else {
        // Si no hay registros reales, generar estadísticas simuladas
        setEmployeeStats({
          hoursThisMonth: `${Math.floor(120 + Math.random() * 40)}h`,
          daysWorked: Math.floor(18 + Math.random() * 5),
          punctuality: `${Math.floor(90 + Math.random() * 10)}%`,
          extraHours: `${Math.floor(Math.random() * 15)}h`
        });
      }
    } catch (err) {
      console.error('Error al calcular estadísticas:', err);
      setEmployeeStats({
        hoursThisMonth: '0h',
        daysWorked: 0,
        punctuality: '100%',
        extraHours: '0h'
      });
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles del Empleado</h1>
        <div className="space-x-2">
          <a 
            href="/admin/employees" 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Volver
          </a>
          <a 
            href={`/admin/employees/edit-employee?id=${employeeId}`} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Editar
          </a>
        </div>
      </div>
      
      {/* Información del empleado */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-500">{employeeData.name.charAt(0)}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{employeeData.name}</h2>
              <p className="text-gray-600">{employeeData.position}</p>
              <div className="mt-2">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employeeData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {employeeData.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <a 
                href={`/reports?employeeId=${employeeId}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Ver Informes
              </a>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID de Empleado</p>
                <p className="font-medium">{employeeData.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Departamento</p>
                <p className="font-medium">{employeeData.department}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{employeeData.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Fecha de Inicio</p>
                <p className="font-medium">{employeeData.startDate ? formatDate(employeeData.startDate) : 'No especificada'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{employeeData.phone || 'No especificado'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium">{employeeData.address || 'No especificada'}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Contacto de Emergencia</p>
                <p className="font-medium">{employeeData.emergencyContact || 'No especificado'}</p>
              </div>
              
              {employeeData.notes && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Notas</p>
                  <p className="font-medium">{employeeData.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Estadísticas */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas del Mes Actual</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800">Horas Trabajadas</h4>
            <p className="text-2xl font-bold text-blue-600">{employeeStats.hoursThisMonth}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800">Días Trabajados</h4>
            <p className="text-2xl font-bold text-green-600">{employeeStats.daysWorked} días</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800">Puntualidad</h4>
            <p className="text-2xl font-bold text-purple-600">{employeeStats.punctuality}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800">Horas Extra</h4>
            <p className="text-2xl font-bold text-yellow-600">{employeeStats.extraHours}</p>
          </div>
        </div>
      </div>
      
      {/* Historial de registros */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Historial de Registros Recientes</h3>
          {!isUserAddedEmployee && timeRecords.length > 0 && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Datos simulados para demostración
            </div>
          )}
        </div>
        
        {isUserAddedEmployee && timeRecords.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
            <p className="font-bold">Sin registros</p>
            <p>Este empleado aún no tiene registros de tiempo en el sistema. Los empleados pueden registrar su tiempo de trabajo iniciando sesión en el sistema.</p>
          </div>
        )}
        
        {!isUserAddedEmployee && timeRecords.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
            <p className="font-bold">Información</p>
            <p>Los registros mostrados son datos simulados para fines de demostración. Este empleado aún no tiene registros de tiempo reales en el sistema.</p>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeRecords.length > 0 ? (
                timeRecords.slice(0, 5).map((record, index) => (
                  <tr key={index} className={record.isSimulated ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(record.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.entry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.exit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay registros disponibles para este empleado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {timeRecords.length > 0 && (
          <div className="mt-4 text-right">
            <a 
              href={`/reports?employeeId=${employeeId}`}
              className="text-blue-600 hover:text-blue-900 font-medium"
            >
              Ver todos los registros →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
