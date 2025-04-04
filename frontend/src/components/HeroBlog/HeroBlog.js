import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBlog.css';

const HeroBlog = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articulos/${article.id}`);
  };

  return (
    <div className='hero-blog-container' onClick={handleClick}>
      <div className="titulo-blog">
        <h1>{article.title}</h1>
        <p className="titulo-blog-subtitle">
          {article.subtitle}
        </p>
      </div>
      
      <div className="descripcion-blog">
        <p className="descripcion-blog-subtitle">
          {article.summary}
        </p>
        
        <div className="content-section">
          <div className="article-meta">
            <span className="article-date"><strong>Publicado:</strong> {article.date}</span>
            <span className="article-category"><strong>Categoría:</strong> {article.category}</span>
            <span className="article-read-time">{article.readTime}</span>
          </div>
          
          <button className="read-more-button">Leer artículo completo →</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBlog;