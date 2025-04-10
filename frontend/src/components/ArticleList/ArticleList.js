import React, { useState } from 'react';
import './ArticleList.css';

const ArticleList = ({ articles, onArticleClick, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const currentArticles = articles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  // Calculate dynamic height based on item count
  const viewportHeight = 180 * itemsPerPage + 24 * (itemsPerPage - 1);

  return (
    <div className="vertical-article-carousel">
      <div className="articles-viewport" style={{ height: `${viewportHeight}px` }}>
        <div className="articles-slide-container">
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="article-card"
              onClick={() => onArticleClick(article)}
            >
              <span className="article-date">{formatDate(article.fecha_publicacion)}</span>
              <h3 className="article-title">{article.titulo}</h3>
              {article.resumen && <p className="article-content">{article.resumen}</p>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button 
          onClick={goToPrev}
          disabled={currentPage === 0}
          className="carousel-button"
        >
          Anteriores
        </button>
        <span className="page-indicator">Página {currentPage + 1} de {totalPages}</span>
        <button 
          onClick={goToNext}
          disabled={currentPage === totalPages - 1}
          className="carousel-button"
        >
          Siguientes
        </button>
      </div>
    </div>
  );
};

export default ArticleList;