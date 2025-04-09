import React from 'react';
import './DashboardStats.css';

const DashboardStats = ({ stats }) => {
  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">article</span>
        </div>
        <div className="stat-content">
          <h3>{stats.articles || 0}</h3>
          <p>Artículos</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">category</span>
        </div>
        <div className="stat-content">
          <h3>{stats.categories || 0}</h3>
          <p>Categorías</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">tag</span>
        </div>
        <div className="stat-content">
          <h3>{stats.tags || 0}</h3>
          <p>Etiquetas</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">comment</span>
        </div>
        <div className="stat-content">
          <h3>{stats.comments || 0}</h3>
          <p>Comentarios</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">people</span>
        </div>
        <div className="stat-content">
          <h3>{stats.users || 0}</h3>
          <p>Usuarios</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <span className="material-icons">email</span>
        </div>
        <div className="stat-content">
          <h3>{stats.subscribers || 0}</h3>
          <p>Suscriptores</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;