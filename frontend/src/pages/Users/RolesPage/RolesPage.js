import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormRole from '../../../components/Admin/FormRole/FormRole';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/users';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'nivel_prioridad', title: 'Nivel' },
    { 
      key: 'permisos', 
      title: 'Permisos',
      render: (item) => item.permisos?.length || 0
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesData, permissionsData] = await Promise.all([
          api.getRoles(authToken),
          api.getPermissions(authToken)
        ]);
        
        setRoles(rolesData);
        setPermissions(permissionsData);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentRole(null);
    setIsModalOpen(true);
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (role) => {
    if (window.confirm(`¿Estás seguro de eliminar el rol "${role.nombre}"?`)) {
      try {
        await api.deleteRole(role.id, authToken);
        setRoles(roles.filter(r => r.id !== role.id));
      } catch (err) {
        setError('Error al eliminar el rol');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedRole;
      
      if (currentRole) {
        updatedRole = await api.updateRole(currentRole.id, formData, authToken);
        setRoles(roles.map(r => r.id === currentRole.id ? updatedRole : r));
      } else {
        updatedRole = await api.createRole(formData, authToken);
        setRoles([...roles, updatedRole]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar el rol');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando roles...</p>
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
        <h1>Gestión de Roles</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nuevo Rol
        </button>
      </div>
      
      <DataTable
        data={roles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentRole ? 'Editar Rol' : 'Crear Rol'}</h2>
        <FormRole
          onSubmit={handleSubmit}
          initialData={currentRole}
          permissions={permissions}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default RolesPage;