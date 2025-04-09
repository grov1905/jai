import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'email', title: 'Email' },
    { 
      key: 'confirmado', 
      title: 'Estado',
      render: (item) => (
        <span className={`subscriber-status ${item.confirmado ? 'confirmed' : 'pending'}`}>
          {item.confirmado ? 'Confirmado' : 'Pendiente'}
        </span>
      )
    },
    { 
      key: 'frecuencia', 
      title: 'Frecuencia',
      render: (item) => (
        <span className={`subscriber-frequency ${item.frecuencia}`}>
          {item.frecuencia === 'diario' ? 'Diario' : 
           item.frecuencia === 'semanal' ? 'Semanal' : 'Mensual'}
        </span>
      )
    },
    { key: 'fecha_registro', title: 'Fecha Registro' },
  ];

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const data = await api.getSubscribers(authToken);
        setSubscribers(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los suscriptores');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [authToken]);

  const handleExport = async () => {
    try {
      const response = await api.exportSubscribers(authToken);
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'suscriptores-newsletter.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Error al exportar los suscriptores');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando suscriptores...</p>
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
      <div className="page-header">
        <h1>Gestión de Newsletter</h1>
        <button onClick={handleExport} className="export-btn">
          Exportar CSV
        </button>
      </div>
      
      <DataTable
        data={subscribers}
        columns={columns}
      />
    </AdminLayout>
  );
};

export default NewsletterPage;