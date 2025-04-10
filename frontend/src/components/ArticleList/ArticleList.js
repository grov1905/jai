import React, { useState, useEffect } from 'react';
import './ArticleList.css';

const ArticleList = ({ articles = [], onArticleClick, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [initialArticles] = useState(articles); // Store initial articles for pre-render

  // Detect client-side only after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(initialArticles.length / itemsPerPage);
  const currentArticles = isClient 
    ? articles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : initialArticles.slice(0, itemsPerPage); // Only show first page during pre-render

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  // Calculate dynamic height based on item count
  const viewportHeight = 180 * itemsPerPage + 24 * (itemsPerPage - 1);

  // If not on client side and no articles, return minimal pre-render structure
  if (!isClient && initialArticles.length === 0) {
    return (
      <div className="vertical-article-carousel">
        <div className="articles-viewport" style={{ height: `${viewportHeight}px` }}>
          <div className="articles-slide-container">
            {[...Array(itemsPerPage)].map((_, i) => (
              <div key={`placeholder-${i}`} className="article-card">
                <span className="article-date">Cargando...</span>
                <h3 className="article-title">Artículo de ejemplo</h3>
                <p className="article-content">Resumen del artículo</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vertical-article-carousel">
      <div className="articles-viewport" style={{ height: `${viewportHeight}px` }}>
        <div className="articles-slide-container">
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="article-card"
              onClick={() => isClient && onArticleClick(article)}
              aria-label={`Leer artículo: ${article.titulo}`}
            >
              <span className="article-date">{formatDate(article.fecha_publicacion)}</span>
              <h3 className="article-title">{article.titulo}</h3>
              {article.resumen && (
                <p className="article-content">{article.resumen}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {isClient && totalPages > 1 && (
        <div className="carousel-controls">
          <button 
            onClick={goToPrev}
            disabled={currentPage === 0}
            className="carousel-button"
            aria-label="Artículos anteriores"
          >
            Anteriores
          </button>
          <span className="page-indicator">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button 
            onClick={goToNext}
            disabled={currentPage === totalPages - 1}
            className="carousel-button"
            aria-label="Artículos siguientes"
          >
            Siguientes
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;