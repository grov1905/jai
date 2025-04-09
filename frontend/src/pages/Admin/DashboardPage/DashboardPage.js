import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DashboardStats from '../../../components/Admin/DashboardStats/DashboardStats';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const DashboardPage = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardStats(authToken);
        setStats(data);
      } catch (err) {
        setError(err.message || 'Error al cargar estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [authToken]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando estadísticas...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="error-container">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1>Panel de Control</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar todos los aspectos de tu blog.</p>
      
      <DashboardStats stats={stats} />
      
      <div className="recent-activity">
        <h2>Actividad Reciente</h2>
        {/* Aquí iría un componente de actividad reciente */}
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;