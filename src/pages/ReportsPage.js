import React from 'react';
import { Navbar, Footer, ReportFilters, ReportSummary, Table, Button } from '../components/UIComponents';

export default function ReportsPage() {
  // Datos de ejemplo para el resumen del informe
  const summaryItems = [
    { label: 'Total Horas', value: '187.5h' },
    { label: 'Promedio Diario', value: '7.8h' },
    { label: 'Empleados', value: '8' },
    { label: 'Clientes', value: '3' }
  ];

  // Datos de ejemplo para la tabla de empleados
  const headers = ['Empleado', 'Total Horas', 'Promedio Diario', 'Cliente Principal', 'Rendimiento'];
  const data = [
    ['Ana García', '42.5h', '8.5h', 'Cliente A', <div className="badge badge-success">Alto</div>],
    ['Carlos Rodríguez', '38.0h', '7.6h', 'Cliente B', <div className="badge badge-primary">Medio</div>],
    ['Elena Martínez', '40.5h', '8.1h', 'Cliente A', <div className="badge badge-success">Alto</div>],
    ['Javier López', '35.0h', '7.0h', 'Cliente C', <div className="badge badge-primary">Medio</div>],
    ['María Sánchez', '31.5h', '6.3h', 'Cliente B', <div className="badge badge-warning">Bajo</div>]
  ];

  return (
    <>
      <Navbar activePage="reports" />
      
      <main className="container py-5">
        <h1 className="mb-4">Informes</h1>
        
        <ReportFilters />
        
        <div className="report-results">
          <h3 className="report-results-title">Resultados</h3>
          
          <ReportSummary items={summaryItems} />
          
          <div className="report-chart mb-8">
            <p className="text-center text-dark-gray mb-2">Gráfico de Horas Trabajadas por Día</p>
            <div className="bg-light-gray h-[300px] rounded-md flex items-center justify-center">
              <p className="text-dark-gray">Aquí se mostraría el gráfico de líneas</p>
            </div>
          </div>
          
          <div className="report-chart mb-8">
            <p className="text-center text-dark-gray mb-2">Gráfico de Horas Trabajadas por Empleado</p>
            <div className="bg-light-gray h-[300px] rounded-md flex items-center justify-center">
              <p className="text-dark-gray">Aquí se mostraría el gráfico de barras</p>
            </div>
          </div>
          
          <h4 className="mb-3">Detalles por Empleado</h4>
          <Table headers={headers} data={data} />
          
          <div className="report-actions">
            <Button variant="outline">Exportar CSV</Button>
            <Button variant="outline">Exportar Excel</Button>
            <Button variant="primary">Generar PDF</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
