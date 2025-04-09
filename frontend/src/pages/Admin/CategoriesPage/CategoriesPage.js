import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormCategory from '../../../components/Admin/FormCategory/FormCategory';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'slug', title: 'Slug' },
    { 
      key: 'parent', 
      title: 'Categoría Padre',
      render: (item) => item.parent?.nombre || '-'
    },
    { key: 'orden', title: 'Orden' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await api.getCategories(authToken);
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (category) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${category.nombre}"?`)) {
      try {
        await api.deleteCategory(category.id, authToken);
        setCategories(categories.filter(c => c.id !== category.id));
      } catch (err) {
        setError('Error al eliminar la categoría');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedCategory;
      
      if (currentCategory) {
        updatedCategory = await api.updateCategory(currentCategory.id, formData, authToken);
        setCategories(categories.map(c => c.id === currentCategory.id ? updatedCategory : c));
      } else {
        updatedCategory = await api.createCategory(formData, authToken);
        setCategories([...categories, updatedCategory]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando categorías...</p>
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
        <h1>Gestión de Categorías</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nueva Categoría
        </button>
      </div>
      
      <DataTable
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentCategory ? 'Editar Categoría' : 'Crear Categoría'}</h2>
        <FormCategory
          onSubmit={handleSubmit}
          initialData={currentCategory}
          categories={categories.filter(c => !currentCategory || c.id !== currentCategory.id)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default CategoriesPage;