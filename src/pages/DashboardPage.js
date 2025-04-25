import React from 'react';
import { Navbar, Footer, StatCard, TimeEntryForm, RecentEntries } from '../components/UIComponents';

export default function DashboardPage() {
  // Datos de ejemplo para los registros recientes
  const recentEntries = [
    { date: 'Hoy, 9:00 AM - 5:30 PM', client: 'Cliente A', time: '8.5h' },
    { date: 'Ayer, 8:30 AM - 4:00 PM', client: 'Cliente B', time: '7.5h' },
    { date: '23/04/2025, 9:15 AM - 6:00 PM', client: 'Cliente A', time: '8.75h' }
  ];

  return (
    <>
      <Navbar activePage="dashboard" />
      
      <main className="container py-5">
        <h1 className="mb-4">Panel de Control</h1>
        
        <div className="dashboard-stats">
          <StatCard 
            title="Horas Trabajadas (Hoy)" 
            value="32.5h" 
            change="↑ 12%" 
            changeType="positive" 
          />
          
          <StatCard 
            title="Empleados Activos" 
            value="8/10" 
          />
          
          <StatCard 
            title="Tiempo Promedio" 
            value="7.2h" 
            change="↓ 3%" 
            changeType="negative" 
          />
          
          <StatCard 
            title="Registros Pendientes" 
            value="3" 
          />
        </div>
        
        <TimeEntryForm />
        
        <RecentEntries entries={recentEntries} />
      </main>
      
      <Footer />
    </>
  );
}
