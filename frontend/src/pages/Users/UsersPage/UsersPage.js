import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormUser from '../../../components/Admin/FormUser/FormUser';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/users';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'username', title: 'Usuario' },
    { key: 'email', title: 'Email' },
    { 
      key: 'estado', 
      title: 'Estado',
      render: (item) => (
        <span className={`status-badge ${item.estado}`}>
          {item.estado === 'activo' ? 'Activo' : 
           item.estado === 'inactivo' ? 'Inactivo' : 'Suspendido'}
        </span>
      )
    },
    { 
      key: 'is_staff', 
      title: 'Staff',
      render: (item) => (
        <span className={`status-badge ${item.is_staff ? 'staff' : 'user'}`}>
          {item.is_staff ? 'Staff' : 'Usuario'}
        </span>
      )
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await api.getUsers(authToken);
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario "${user.username}"?`)) {
      try {
        await api.deleteUser(user.id, authToken);
        setUsers(users.filter(u => u.id !== user.id));
      } catch (err) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedUser;
      
      if (currentUser) {
        updatedUser = await api.updateUser(currentUser.id, formData, authToken);
        setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      } else {
        updatedUser = await api.createUser(formData, authToken);
        setUsers([...users, updatedUser]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar el usuario');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando usuarios...</p>
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
        <h1>Gestión de Usuarios</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nuevo Usuario
        </button>
      </div>
      
      <DataTable
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <FormUser
          onSubmit={handleSubmit}
          initialData={currentUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default UsersPage;