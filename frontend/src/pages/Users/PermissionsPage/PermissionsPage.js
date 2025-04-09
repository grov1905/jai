import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormPermission from '../../../components/Admin/FormPermission/FormPermission';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/users';

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'codigo', title: 'Código' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'descripcion', title: 'Descripción' },
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const data = await api.getPermissions(authToken);
        setPermissions(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los permisos');
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentPermission(null);
    setIsModalOpen(true);
  };

  const handleEdit = (permission) => {
    setCurrentPermission(permission);
    setIsModalOpen(true);
  };

  const handleDelete = async (permission) => {
    if (window.confirm(`¿Estás seguro de eliminar el permiso "${permission.nombre}"?`)) {
      try {
        await api.deletePermission(permission.id, authToken);
        setPermissions(permissions.filter(p => p.id !== permission.id));
      } catch (err) {
        setError('Error al eliminar el permiso');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedPermission;
      
      if (currentPermission) {
        updatedPermission = await api.updatePermission(currentPermission.id, formData, authToken);
        setPermissions(permissions.map(p => p.id === currentPermission.id ? updatedPermission : p));
      } else {
        updatedPermission = await api.createPermission(formData, authToken);
        setPermissions([...permissions, updatedPermission]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar el permiso');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando permisos...</p>
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
        <h1>Gestión de Permisos</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nuevo Permiso
        </button>
      </div>
      
      <DataTable
        data={permissions}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentPermission ? 'Editar Permiso' : 'Crear Permiso'}</h2>
        <FormPermission
          onSubmit={handleSubmit}
          initialData={currentPermission}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default PermissionsPage;