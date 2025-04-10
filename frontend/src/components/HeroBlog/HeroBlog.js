import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBlog.css';

const HeroBlog = ({ article }) => {
  const navigate = useNavigate();
  const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/default-article-image.jpg';
  const [imgSrc, setImgSrc] = useState(
    // Imagen segura para pre-render
    typeof window === 'undefined' ? DEFAULT_IMAGE : article.imagen_portada_url || DEFAULT_IMAGE
  );

  const handleClick = () => {
    navigate(`/blog/articulo/${article.id}`);
  };

  const handleImageError = () => {
    setImgSrc(DEFAULT_IMAGE);
  };

  return (
    <div className='hero-blog-container' onClick={handleClick}>
      <div className="hero-image-container">
        <img 
          src={imgSrc}
          alt={article.titulo}
          className="hero-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="hero-content">
        <div className="titulo-blog">
          <h1>{article.titulo}</h1>
          {article.subtitulo && (
            <p className="titulo-blog-subtitle">{article.subtitulo}</p>
          )}
        </div>
        
        <div className="descripcion-blog">
          <p className="descripcion-blog-subtitle">
            {article.resumen}
          </p>
          
          <div className="content-section">
            <div className="article-meta">
              <span><strong>Publicado: </strong>
                {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span><strong>Categoría:</strong> {article.categorias[0]?.nombre || "General"}</span>
            </div>
            
            <button className="read-more-button">Leer artículo completo →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBlog;