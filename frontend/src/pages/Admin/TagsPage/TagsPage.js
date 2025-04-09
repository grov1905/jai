import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormTag from '../../../components/Admin/FormTag/FormTag';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'slug', title: 'Slug' },
    { 
      key: 'tipo', 
      title: 'Tipo',
      render: (item) => (
        <span className={`tag-type ${item.tipo}`}>
          {item.tipo === 'tema' ? 'Tema' : 
           item.tipo === 'ubicacion' ? 'Ubicación' : 'Persona'}
        </span>
      )
    },
  ];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const data = await api.getTags(authToken);
        setTags(data);
      } catch (err) {
        setError(err.message || 'Error al cargar las etiquetas');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentTag(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setIsModalOpen(true);
  };

  const handleDelete = async (tag) => {
    if (window.confirm(`¿Estás seguro de eliminar la etiqueta "${tag.nombre}"?`)) {
      try {
        await api.deleteTag(tag.id, authToken);
        setTags(tags.filter(t => t.id !== tag.id));
      } catch (err) {
        setError('Error al eliminar la etiqueta');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedTag;
      
      if (currentTag) {
        updatedTag = await api.updateTag(currentTag.id, formData, authToken);
        setTags(tags.map(t => t.id === currentTag.id ? updatedTag : t));
      } else {
        updatedTag = await api.createTag(formData, authToken);
        setTags([...tags, updatedTag]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar la etiqueta');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando etiquetas...</p>
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
        <h1>Gestión de Etiquetas</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nueva Etiqueta
        </button>
      </div>
      
      <DataTable
        data={tags}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentTag ? 'Editar Etiqueta' : 'Crear Etiqueta'}</h2>
        <FormTag
          onSubmit={handleSubmit}
          initialData={currentTag}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default TagsPage;