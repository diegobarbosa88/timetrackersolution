import React from 'react';
import { useState, useEffect } from 'react';

// Definición del tipo para los registros
interface TimeRecord {
  id: string;
  userId: string;
  date: string;
  entryTime: string;
  exitTime: string;
  client: string;
  totalWorkTime: number;
  usedEntryTolerance: boolean;
}

// Definición del tipo para los empleados
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
}

// Definición del tipo para los clientes
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

export default function ReportsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [reportData, setReportData] = useState<TimeRecord[]>([]);

  useEffect(() => {
    // Cargar datos de ejemplo
    loadSampleData();
  }, []);

  const loadSampleData = () => {
    // Datos de ejemplo para empleados
    const sampleEmployees: Employee[] = [
      {
        id: 'EMP001',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        department: 'Desarrollo',
        position: 'Desarrollador Senior',
        status: 'Activo'
      },
      {
        id: 'EMP002',
        name: 'María López',
        email: 'maria@example.com',
        department: 'Diseño',
        position: 'Diseñadora UX/UI',
        status: 'Activo'
      },
      {
        id: 'EMP003',
        name: 'Carlos Rodríguez',
        email: 'carlos@example.com',
        department: 'Marketing',
        position: 'Especialista en Marketing Digital',
        status: 'Activo'
      }
    ];

    // Datos de ejemplo para clientes
    const sampleClients: Client[] = [
      {
        id: 'CLI001',
        name: 'Empresa ABC',
        email: 'contacto@abc.com',
        phone: '123-456-7890',
        address: 'Calle Principal 123',
        status: 'Activo'
      },
      {
        id: 'CLI002',
        name: 'Corporación XYZ',
        email: 'info@xyz.com',
        phone: '987-654-3210',
        address: 'Avenida Central 456',
        status: 'Activo'
      },
      {
        id: 'CLI003',
        name: 'Industrias 123',
        email: 'ventas@123.com',
        phone: '555-555-5555',
        address: 'Boulevard Norte 789',
        status: 'Activo'
      }
    ];

    // Generar registros de tiempo aleatorios para el mes actual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Array para almacenar los registros generados
    const records: TimeRecord[] = [];

    // Generar registros para cada empleado
    sampleEmployees.forEach(emp => {
      const empId = emp.id;
      
      // Generar registros para cada día del mes (excluyendo fines de semana)
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay(); // 0 = Domingo, 6 = Sábado
        
        // Excluir fines de semana (sábado y domingo)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Hora de entrada (entre 8:00 AM y 9:30 AM)
          const entryHour = 8 + Math.floor(Math.random() * 2);
          const entryMinute = Math.floor(Math.random() * 60);
          const entryTime = `${String(entryHour).padStart(2, '0')}:${String(entryMinute).padStart(2, '0')}`;
          
          // Hora de salida (entre 5:00 PM y 7:00 PM)
          const exitHour = 17 + Math.floor(Math.random() * 3);
          const exitMinute = Math.floor(Math.random() * 60);
          const exitTime = `${String(exitHour).padStart(2, '0')}:${String(exitMinute).padStart(2, '0')}`;
          
          // Calcular tiempo total de trabajo en horas
          const totalWorkHours = (exitHour - entryHour) + (exitMinute - entryMinute) / 60;
          
          // Asignar cliente aleatorio
          const client = clients[Math.floor(Math.random() * clients.length)];
          
          // Crear registro y añadirlo al array
          records.push({
            id: `TR${Date.now().toString().slice(-6)}-${empId}`,
            userId: empId,
            date: dateStr,
            entryTime: entryTime,
            exitTime: exitTime,
            client: client ? client.name : 'Sin cliente',
            totalWorkTime: parseFloat(totalWorkHours.toFixed(2)),
            usedEntryTolerance: Math.random() > 0.7 // 30% de probabilidad de usar tolerancia
          });
        }
      }
    });

    // Actualizar el estado con los datos generados
    setEmployees(sampleEmployees);
    setClients(sampleClients);
    setTimeRecords(records);
  };

  const generateReport = () => {
    setIsGeneratingReport(true);
    
    // Filtrar registros según los criterios seleccionados
    let filteredRecords = [...timeRecords];
    
    // Filtrar por mes
    if (selectedMonth) {
      filteredRecords = filteredRecords.filter(record => record.date.startsWith(selectedMonth));
    }
    
    // Filtrar por empleado
    if (selectedEmployee && selectedEmployee !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.userId === selectedEmployee);
    }
    
    // Filtrar por cliente
    if (selectedClient && selectedClient !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.client === selectedClient);
    }
    
    // Ordenar por fecha y hora de entrada
    filteredRecords.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.entryTime.localeCompare(b.entryTime);
    });
    
    // Simular tiempo de generación del informe
    setTimeout(() => {
      setReportData(filteredRecords);
      setIsGeneratingReport(false);
    }, 1000);
  };

  const exportToPDF = () => {
    alert('Exportación a PDF no implementada en esta versión de demostración');
  };

  const exportToExcel = () => {
    alert('Exportación a Excel no implementada en esta versión de demostración');
  };

  // Función para obtener el nombre del empleado por ID
  const getEmployeeName = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.name : 'Desconocido';
  };

  // Calcular estadísticas
  const calculateStats = () => {
    if (reportData.length === 0) return null;
    
    const totalHours = reportData.reduce((sum, record) => sum + record.totalWorkTime, 0);
    const avgHoursPerDay = totalHours / reportData.length;
    const employeesCount = new Set(reportData.map(record => record.userId)).size;
    
    return {
      totalRecords: reportData.length,
      totalHours: totalHours.toFixed(2),
      avgHoursPerDay: avgHoursPerDay.toFixed(2),
      employeesCount
    };
  };

  const stats = calculateStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generación de Informes</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtros del Informe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empleado</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos los empleados</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos los clientes</option>
              {clients.map(client => (
                <option key={client.id} value={client.name}>{client.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generateReport}
            disabled={isGeneratingReport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            {isGeneratingReport ? 'Generando...' : 'Generar Informe'}
          </button>
        </div>
      </div>
      
      {reportData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Resultados del Informe</h2>
            <div className="flex space-x-2">
              <button
                onClick={exportToPDF}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md text-sm"
              >
                Exportar a PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md text-sm"
              >
                Exportar a Excel
              </button>
            </div>
          </div>
          
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-500">Total de Registros</p>
                <p className="text-xl font-bold">{stats.totalRecords}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-500">Horas Totales</p>
                <p className="text-xl font-bold">{stats.totalHours}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-500">Promedio Horas/Día</p>
                <p className="text-xl font-bold">{stats.avgHoursPerDay}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-500">Empleados</p>
                <p className="text-xl font-bold">{stats.employeesCount}</p>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas</th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tolerancia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-3 text-sm text-gray-900">{record.date}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">{getEmployeeName(record.userId)}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">{record.entryTime}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">{record.exitTime}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">{record.client}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">{record.totalWorkTime}</td>
                    <td className="py-2 px-3 text-sm text-gray-900">
                      {record.usedEntryTolerance ? 'Sí' : 'No'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
