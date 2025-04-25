import React from 'react';

// Componente de encabezado principal inspirado en Bizneo
export function Header() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">TimeTracker</div>
        <nav>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="/" className="navbar-link active">Inicio</a>
            </li>
            <li className="navbar-item">
              <a href="/dashboard" className="navbar-link">Dashboard</a>
            </li>
            <li className="navbar-item">
              <a href="/reports" className="navbar-link">Informes</a>
            </li>
            <li className="navbar-item">
              <a href="/admin/employees" className="navbar-link">Empleados</a>
            </li>
            <li className="navbar-item">
              <a href="/profile" className="navbar-link">Perfil</a>
            </li>
          </ul>
        </nav>
        <div>
          <button className="btn btn-primary">Iniciar Sesión</button>
        </div>
      </div>
    </header>
  );
}

// Componente de pie de página
export function Footer() {
  return (
    <footer className="bg-primary-dark text-white p-4">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1">© 2025 TimeTracker - Todos los derechos reservados</p>
            <p className="text-sm">Sistema de Control de Tiempo para Empresas</p>
          </div>
          <div>
            <a href="/terms" className="text-white mr-3">Términos</a>
            <a href="/privacy" className="text-white mr-3">Privacidad</a>
            <a href="/contact" className="text-white">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente de tarjeta de característica
export function FeatureCard({ icon, title, description }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="text-primary mb-2">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
    </div>
  );
}

// Componente de estadística
export function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  );
}

// Componente de formulario de entrada de tiempo
export function TimeEntryForm() {
  return (
    <div className="time-entry-form">
      <h3 className="time-entry-form-title">Registrar Tiempo</h3>
      <div className="time-entry-grid">
        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Hora de Entrada</label>
          <input type="time" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Hora de Salida</label>
          <input type="time" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Cliente</label>
          <select className="form-control">
            <option value="">Seleccionar cliente</option>
            <option value="1">Cliente A</option>
            <option value="2">Cliente B</option>
            <option value="3">Cliente C</option>
          </select>
        </div>
      </div>
      <div className="time-entry-actions">
        <button className="btn btn-primary">Guardar Registro</button>
      </div>
    </div>
  );
}

// Componente de tarjeta de empleado
export function EmployeeCard({ name, position, email, department, avatar }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="employee-card">
      <div className="employee-header">
        <div className="employee-avatar">
          {avatar ? <img src={avatar} alt={name} /> : initials}
        </div>
        <div className="employee-info">
          <h4 className="employee-name">{name}</h4>
          <div className="employee-position">{position}</div>
        </div>
      </div>
      <div className="employee-details">
        <div className="employee-detail">
          <div className="employee-detail-label">Email:</div>
          <div className="employee-detail-value">{email}</div>
        </div>
        <div className="employee-detail">
          <div className="employee-detail-label">Departamento:</div>
          <div className="employee-detail-value">{department}</div>
        </div>
      </div>
      <div className="employee-actions">
        <button className="btn btn-outline btn-sm">Ver</button>
        <button className="btn btn-primary btn-sm">Editar</button>
      </div>
    </div>
  );
}

// Componente de página de inicio
export function HomePage() {
  return (
    <div>
      <Header />
      
      <main className="container py-5">
        <section className="text-center mb-5">
          <h1 className="mb-3">Sistema de Control de Tiempo</h1>
          <p className="mb-4 text-lg">
            Comienza a gestionar el tiempo de tus empleados de manera eficiente
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn btn-primary">Iniciar Sesión</button>
            <button className="btn btn-outline">Prueba de 15 días</button>
          </div>
        </section>
        
        <section className="mb-5">
          <h2 className="text-center mb-4">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard 
              icon={<span className="text-3xl">⏱️</span>}
              title="Control de Tiempo"
              description="Registra entradas y salidas de empleados con precisión y facilidad."
            />
            <FeatureCard 
              icon={<span className="text-3xl">📊</span>}
              title="Informes Detallados"
              description="Genera informes de asistencia, horas trabajadas y rendimiento."
            />
            <FeatureCard 
              icon={<span className="text-3xl">👥</span>}
              title="Gestión de Empleados"
              description="Administra perfiles, departamentos y permisos de empleados."
            />
          </div>
        </section>
        
        <section className="bg-primary-dark text-white p-5 rounded-lg mb-5">
          <h2 className="text-center mb-4">Comienza a gestionar el tiempo de tus empleados de manera eficiente</h2>
          <div className="text-center">
            <button className="btn btn-secondary">Solicitar Demo</button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Componente de página de dashboard
export function DashboardPage() {
  return (
    <div>
      <Header />
      
      <main className="container py-5">
        <h1 className="mb-4">Panel de Control</h1>
        
        <div className="dashboard-stats">
          <StatCard 
            title="Horas Trabajadas (Hoy)" 
            value="32.5h" 
            change="12%" 
            isPositive={true} 
          />
          <StatCard 
            title="Empleados Activos" 
            value="8/10" 
          />
          <StatCard 
            title="Tiempo Promedio" 
            value="7.2h" 
            change="3%" 
            isPositive={false} 
          />
          <StatCard 
            title="Registros Pendientes" 
            value="3" 
          />
        </div>
        
        <TimeEntryForm />
        
        <div className="recent-entries">
          <h3 className="recent-entries-title">Registros Recientes</h3>
          <ul className="entry-list">
            <li className="entry-item">
              <div className="entry-info">
                <div className="entry-date">Hoy, 9:00 AM - 5:30 PM</div>
                <div className="entry-client">Cliente A</div>
              </div>
              <div className="entry-time">8.5h</div>
              <div className="entry-actions">
                <button className="btn btn-outline btn-sm">Editar</button>
                <button className="btn btn-outline btn-sm text-error">Eliminar</button>
              </div>
            </li>
            <li className="entry-item">
              <div className="entry-info">
                <div className="entry-date">Ayer, 8:30 AM - 4:00 PM</div>
                <div className="entry-client">Cliente B</div>
              </div>
              <div className="entry-time">7.5h</div>
              <div className="entry-actions">
                <button className="btn btn-outline btn-sm">Editar</button>
                <button className="btn btn-outline btn-sm text-error">Eliminar</button>
              </div>
            </li>
            <li className="entry-item">
              <div className="entry-info">
                <div className="entry-date">23/04/2025, 9:15 AM - 6:00 PM</div>
                <div className="entry-client">Cliente A</div>
              </div>
              <div className="entry-time">8.75h</div>
              <div className="entry-actions">
                <button className="btn btn-outline btn-sm">Editar</button>
                <button className="btn btn-outline btn-sm text-error">Eliminar</button>
              </div>
            </li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Componente de página de empleados
export function EmployeesPage() {
  return (
    <div>
      <Header />
      
      <main className="container py-5">
        <div className="flex justify-between items-center mb-4">
          <h1>Empleados</h1>
          <button className="btn btn-primary">Añadir Empleado</button>
        </div>
        
        <div className="employee-grid">
          <EmployeeCard 
            name="Ana García" 
            position="Desarrolladora Frontend" 
            email="ana.garcia@example.com" 
            department="Tecnología" 
          />
          <EmployeeCard 
            name="Carlos Rodríguez" 
            position="Diseñador UX/UI" 
            email="carlos.rodriguez@example.com" 
            department="Diseño" 
          />
          <EmployeeCard 
            name="Elena Martínez" 
            position="Project Manager" 
            email="elena.martinez@example.com" 
            department="Gestión" 
          />
          <EmployeeCard 
            name="Javier López" 
            position="Desarrollador Backend" 
            email="javier.lopez@example.com" 
            department="Tecnología" 
          />
          <EmployeeCard 
            name="María Sánchez" 
            position="Marketing Digital" 
            email="maria.sanchez@example.com" 
            department="Marketing" 
          />
          <EmployeeCard 
            name="Pedro Gómez" 
            position="Analista de Datos" 
            email="pedro.gomez@example.com" 
            department="Análisis" 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Componente de página de login
export function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <h2 className="text-primary-dark">TimeTracker</h2>
        </div>
        <h1 className="login-title">Iniciar Sesión</h1>
        <form className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="ejemplo@correo.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" placeholder="••••••••" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">Recordarme</label>
            </div>
            <a href="/forgot-password" className="text-sm">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className="btn btn-primary w-full">Iniciar Sesión</button>
        </form>
        <div className="login-footer">
          <p>Para pruebas, use:</p>
          <p>Email: admin@example.com</p>
          <p>Contraseña: password</p>
        </div>
      </div>
    </div>
  );
}
