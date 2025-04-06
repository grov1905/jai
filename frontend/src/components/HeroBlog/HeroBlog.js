import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBlog.css';

const HeroBlog = ({ article }) => {
  const navigate = useNavigate();
  const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/default-article-image.jpg';

  const handleClick = () => {
    navigate(`/blog/articulo/${article.id}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <div className='hero-blog-container' onClick={handleClick}>
      <div className="hero-image-container">
        <img 
          src={article.imagen_portada_url || DEFAULT_IMAGE} 
          alt={article.titulo}
          className="hero-image"
          onError={handleImageError}
        />
      </div>
      
      <div className="hero-content">
        <div className="titulo-blog">
          <h1>{article.titulo}</h1>
          <p className="titulo-blog-subtitle">
            {article.subtitulo}
          </p>
        </div>
        
        <div className="descripcion-blog">
          <p className="descripcion-blog-subtitle">
            {article.resumen}
          </p>
          
          <div className="content-section">
            <div className="article-meta">
              <span className="article-date"><strong>Publicado: </strong>{new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) || "Fecha no disponible"}</span>
              <span className="article-category"><strong>Categoría:</strong> {article.categorias[0]?.nombre || "General"}</span>
              <span className="article-read-time"><strong>Actualizado:</strong> {new Date(article.updated_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) || "Fecha no disponible"}</span>
            </div>
            
            <button className="read-more-button">Leer artículo completo →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBlog;