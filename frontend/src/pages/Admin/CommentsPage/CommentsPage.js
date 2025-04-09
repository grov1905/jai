import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import DataTable from '../../../components/Admin/DataTable/DataTable';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/admin';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  const columns = [
    { key: 'id', title: 'ID' },
    { 
      key: 'contenido', 
      title: 'Comentario',
      render: (item) => (
        <div className="comment-content">
          {item.contenido.length > 50 
            ? `${item.contenido.substring(0, 50)}...` 
            : item.contenido}
        </div>
      )
    },
    { 
      key: 'usuario', 
      title: 'Usuario',
      render: (item) => item.usuario.username
    },
    { 
      key: 'articulo', 
      title: 'Artículo',
      render: (item) => item.articulo.titulo
    },
    { 
      key: 'estado', 
      title: 'Estado',
      render: (item) => (
        <span className={`comment-status ${item.estado}`}>
          {item.estado === 'pendiente' ? 'Pendiente' : 
           item.estado === 'aprobado' ? 'Aprobado' : 'Rechazado'}
        </span>
      )
    },
    { key: 'fecha', title: 'Fecha' },
  ];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await api.getComments(authToken);
        setComments(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los comentarios');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [authToken]);

  const handleApprove = async (comment) => {
    try {
      const updatedComment = await api.updateCommentStatus(comment.id, 'aprobado', authToken);
      setComments(comments.map(c => c.id === comment.id ? updatedComment : c));
    } catch (err) {
      setError('Error al aprobar el comentario');
    }
  };

  const handleReject = async (comment) => {
    try {
      const updatedComment = await api.updateCommentStatus(comment.id, 'rechazado', authToken);
      setComments(comments.map(c => c.id === comment.id ? updatedComment : c));
    } catch (err) {
      setError('Error al rechazar el comentario');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando comentarios...</p>
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
        <h1>Moderación de Comentarios</h1>
      </div>
      
      <DataTable
        data={comments}
        columns={columns}
        actions={[
          {
            label: 'Aprobar',
            handler: handleApprove,
            condition: (item) => item.estado !== 'aprobado',
            className: 'approve-btn'
          },
          {
            label: 'Rechazar',
            handler: handleReject,
            condition: (item) => item.estado !== 'rechazado',
            className: 'reject-btn'
          }
        ]}
      />
    </AdminLayout>
  );
};

export default CommentsPage;