import React from 'react';
import { Navbar, Footer, Button, EmployeeCard } from '../components/UIComponents';

export default function EmployeesPage() {
  // Datos de ejemplo para los empleados
  const employees = [
    {
      name: 'Ana García',
      position: 'Desarrolladora Senior',
      email: 'ana.garcia@empresa.com',
      phone: '+34 612 345 678',
      department: 'Desarrollo'
    },
    {
      name: 'Carlos Rodríguez',
      position: 'Diseñador UX/UI',
      email: 'carlos.rodriguez@empresa.com',
      phone: '+34 623 456 789',
      department: 'Diseño'
    },
    {
      name: 'Elena Martínez',
      position: 'Project Manager',
      email: 'elena.martinez@empresa.com',
      phone: '+34 634 567 890',
      department: 'Gestión'
    },
    {
      name: 'Javier López',
      position: 'Desarrollador Frontend',
      email: 'javier.lopez@empresa.com',
      phone: '+34 645 678 901',
      department: 'Desarrollo'
    },
    {
      name: 'María Sánchez',
      position: 'Marketing Digital',
      email: 'maria.sanchez@empresa.com',
      phone: '+34 656 789 012',
      department: 'Marketing'
    },
    {
      name: 'Pedro Gómez',
      position: 'Desarrollador Backend',
      email: 'pedro.gomez@empresa.com',
      phone: '+34 667 890 123',
      department: 'Desarrollo'
    }
  ];

  return (
    <>
      <Navbar activePage="employees" />
      
      <main className="container py-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="mb-0">Empleados</h1>
          <Button variant="primary">Añadir Empleado</Button>
        </div>
        
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Buscar empleado..." 
              className="form-control w-full max-w-md"
            />
            <Button variant="outline">Buscar</Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Todos</Button>
            <Button variant="outline" size="sm">Desarrollo</Button>
            <Button variant="outline" size="sm">Diseño</Button>
            <Button variant="outline" size="sm">Gestión</Button>
            <Button variant="outline" size="sm">Marketing</Button>
          </div>
        </div>
        
        <div className="employee-grid">
          {employees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline">Cargar Más</Button>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
