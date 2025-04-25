import React from 'react';

export const Navbar = ({ activePage }) => {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">TimeTracker</div>
        <nav>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="/" className={`navbar-link ${activePage === 'home' ? 'active' : ''}`}>Inicio</a>
            </li>
            <li className="navbar-item">
              <a href="/dashboard" className={`navbar-link ${activePage === 'dashboard' ? 'active' : ''}`}>Dashboard</a>
            </li>
            <li className="navbar-item">
              <a href="/reports" className={`navbar-link ${activePage === 'reports' ? 'active' : ''}`}>Informes</a>
            </li>
            <li className="navbar-item">
              <a href="/admin/employees" className={`navbar-link ${activePage === 'employees' ? 'active' : ''}`}>Empleados</a>
            </li>
            <li className="navbar-item">
              <a href="/profile" className={`navbar-link ${activePage === 'profile' ? 'active' : ''}`}>Perfil</a>
            </li>
          </ul>
        </nav>
        <div>
          <button className="btn btn-outline">Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => {
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
};

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClass = 'btn';
  const variantClass = variant ? `btn-${variant}` : '';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  
  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card = ({ title, subtitle, children, footer, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export const FormGroup = ({ label, children, className = '' }) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      {children}
    </div>
  );
};

export const Input = ({ label, ...props }) => {
  return (
    <FormGroup label={label}>
      <input className="form-control" {...props} />
    </FormGroup>
  );
};

export const Select = ({ label, options = [], ...props }) => {
  return (
    <FormGroup label={label}>
      <select className="form-control" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
};

export const Alert = ({ children, type = 'info', className = '' }) => {
  return (
    <div className={`alert alert-${type} ${className}`}>
      {children}
    </div>
  );
};

export const Badge = ({ children, type = 'primary', className = '' }) => {
  return (
    <span className={`badge badge-${type} ${className}`}>
      {children}
    </span>
  );
};

export const StatCard = ({ title, value, change, changeType }) => {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change ${changeType}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export const Table = ({ headers = [], data = [], className = '' }) => {
  return (
    <div className="table-responsive">
      <table className={`table ${className}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TimeEntryForm = () => {
  return (
    <div className="time-entry-form">
      <h3 className="time-entry-form-title">Registrar Tiempo</h3>
      <div className="time-entry-grid">
        <FormGroup label="Fecha">
          <input type="date" className="form-control" />
        </FormGroup>
        <FormGroup label="Hora de Entrada">
          <input type="time" className="form-control" />
        </FormGroup>
        <FormGroup label="Hora de Salida">
          <input type="time" className="form-control" />
        </FormGroup>
        <FormGroup label="Cliente">
          <select className="form-control">
            <option value="">Seleccionar cliente</option>
            <option value="1">Cliente A</option>
            <option value="2">Cliente B</option>
            <option value="3">Cliente C</option>
          </select>
        </FormGroup>
      </div>
      <div className="time-entry-actions">
        <Button variant="primary">Guardar Registro</Button>
      </div>
    </div>
  );
};

export const RecentEntries = ({ entries = [] }) => {
  return (
    <div className="recent-entries">
      <h3 className="recent-entries-title">Registros Recientes</h3>
      <ul className="entry-list">
        {entries.map((entry, index) => (
          <li key={index} className="entry-item">
            <div className="entry-info">
              <div className="entry-date">{entry.date}</div>
              <div className="entry-client">{entry.client}</div>
            </div>
            <div className="entry-time">{entry.time}</div>
            <div className="entry-actions">
              <Button variant="outline" size="sm">Editar</Button>
              <Button variant="outline" size="sm" className="text-error">Eliminar</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ReportFilters = () => {
  return (
    <div className="report-filters">
      <h3 className="report-filters-title">Filtros</h3>
      <div className="report-filters-grid">
        <FormGroup label="Fecha Inicio">
          <input type="date" className="form-control" />
        </FormGroup>
        <FormGroup label="Fecha Fin">
          <input type="date" className="form-control" />
        </FormGroup>
        <FormGroup label="Empleado">
          <select className="form-control">
            <option value="">Todos los empleados</option>
            <option value="1">Ana García</option>
            <option value="2">Carlos Rodríguez</option>
            <option value="3">Elena Martínez</option>
          </select>
        </FormGroup>
        <FormGroup label="Cliente">
          <select className="form-control">
            <option value="">Todos los clientes</option>
            <option value="1">Cliente A</option>
            <option value="2">Cliente B</option>
            <option value="3">Cliente C</option>
          </select>
        </FormGroup>
      </div>
      <div className="report-filters-actions">
        <Button variant="outline">Restablecer</Button>
        <Button variant="primary">Generar Informe</Button>
      </div>
    </div>
  );
};

export const ReportSummary = ({ items = [] }) => {
  return (
    <div className="report-summary">
      {items.map((item, index) => (
        <div key={index} className="report-summary-item">
          <div className="report-summary-label">{item.label}</div>
          <div className="report-summary-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <div className="employee-header">
        <div className="employee-avatar">
          {employee.name.charAt(0)}
        </div>
        <div className="employee-info">
          <div className="employee-name">{employee.name}</div>
          <div className="employee-position">{employee.position}</div>
        </div>
      </div>
      <div className="employee-details">
        <div className="employee-detail">
          <div className="employee-detail-label">Email:</div>
          <div className="employee-detail-value">{employee.email}</div>
        </div>
        <div className="employee-detail">
          <div className="employee-detail-label">Teléfono:</div>
          <div className="employee-detail-value">{employee.phone}</div>
        </div>
        <div className="employee-detail">
          <div className="employee-detail-label">Departamento:</div>
          <div className="employee-detail-value">{employee.department}</div>
        </div>
      </div>
      <div className="employee-actions">
        <Button variant="outline" size="sm">Ver</Button>
        <Button variant="outline" size="sm">Editar</Button>
      </div>
    </div>
  );
};
