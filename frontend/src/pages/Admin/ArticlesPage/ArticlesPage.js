import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

import DataTable from '../../../components/Admin/DataTable/DataTable';
import FormArticle from '../../../components/Admin/FormArticle/FormArticle';
import Modal from '../../../components/Modal/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'titulo', title: 'Título' },
    { 
      key: 'estado', 
      title: 'Estado',
      render: (item) => (
        <span className={`status-badge ${item.estado}`}>
          {item.estado === 'borrador' ? 'Borrador' : 
           item.estado === 'revision' ? 'Revisión' : 'Publicado'}
        </span>
      )
    },
    { key: 'fecha_publicacion', title: 'Fecha' },
    { key: 'visitas', title: 'Visitas' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesData, categoriesData, tagsData] = await Promise.all([
          api.getArticles(authToken),
          api.getCategories(authToken),
          api.getTags(authToken)
        ]);
        
        setArticles(articlesData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleCreate = () => {
    setCurrentArticle(null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (article) => {
    if (window.confirm(`¿Estás seguro de eliminar el artículo "${article.titulo}"?`)) {
      try {
        await api.deleteArticle(article.id, authToken);
        setArticles(articles.filter(a => a.id !== article.id));
      } catch (err) {
        setError('Error al eliminar el artículo');
      }
    }
  };

  const handleView = (article) => {
    navigate(`/admin/articles/${article.id}`);
  };

  const handleSubmit = async (formData) => {
    try {
      let updatedArticle;
      
      if (currentArticle) {
        updatedArticle = await api.updateArticle(currentArticle.id, formData, authToken);
        setArticles(articles.map(a => a.id === currentArticle.id ? updatedArticle : a));
      } else {
        updatedArticle = await api.createArticle(formData, authToken);
        setArticles([...articles, updatedArticle]);
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Error al guardar el artículo');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando artículos...</p>
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
        <h1>Gestión de Artículos</h1>
        <button onClick={handleCreate} className="create-btn">
          Crear Nuevo Artículo
        </button>
      </div>
      
      <DataTable
        data={articles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        viewable={true}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{currentArticle ? 'Editar Artículo' : 'Crear Artículo'}</h2>
        <FormArticle
          onSubmit={handleSubmit}
          initialData={currentArticle}
          categories={categories}
          tags={tags}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default ArticlesPage;