import React, { useState, useEffect } from 'react';
import './CategoryGrid.css';

const CategoryGrid = ({ category = 'todos', articles = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format date function (works on both server and client)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Configuration
  const itemsPerSlide = 6; // 3 columns × 2 rows
  const totalSlides = Math.ceil(articles.length / itemsPerSlide);
  const displayArticles = isClient 
    ? articles.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)
    : articles.slice(0, itemsPerSlide); // First slide only for pre-render

  // Split into rows
  const row1 = displayArticles.slice(0, 3);
  const row2 = displayArticles.slice(3, 6);

  // Navigation handlers (client-side only)
  const goToNext = () => {
    if (isClient) {
      setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    }
  };

  const goToPrev = () => {
    if (isClient) {
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    if (isClient) {
      setCurrentSlide(index);
    }
  };

  // Render article card (used for both server and client)
  const renderArticleCard = (article) => (
    <div key={article.id} className="grid-item">
      <div className="post-card">
        <div className="post-header">
          <span className="post-date">{formatDate(article.fecha_publicacion)}</span>
          <span className="read-time">{article.tiempo_lectura} min</span>
        </div>
        <h3>{article.titulo}</h3>
        <p className="post-excerpt">{article.resumen}</p>
        <div className="post-footer">
          <a 
            href={`/blog/articulo/${article.id}`} 
            className="read-more"
            aria-label={`Leer artículo: ${article.titulo}`}
          >
            Leer más →
          </a>
          <span className="post-category">
            {article.categoria || 'General'}
          </span>
        </div>
      </div>
    </div>
  );

  // Render non-interactive version for pre-render
  if (!isClient) {
    return (
      <div className="category-carousel">
        <h2 className="carousel-title">
          {category === 'todos' ? 'Últimas Publicaciones' : `Publicaciones sobre ${category}`}
        </h2>
        
        <div className="carousel-slide">
          <div className="carousel-row">
            {row1.map(renderArticleCard)}
          </div>
          <div className="carousel-row">
            {row2.map(renderArticleCard)}
          </div>
        </div>
      </div>
    );
  }

  // Full interactive version for client
  return (
    <div className="category-carousel">
      <h2 className="carousel-title">
        {category === 'todos' ? 'Últimas Publicaciones' : `Publicaciones sobre ${category}`}
      </h2>
      
      <div className="carousel-wrapper">
        <button 
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className="carousel-arrow prev"
          aria-label="Artículos anteriores"
        >
          ‹
        </button>
        
        <div className="carousel-slide">
          <div className="carousel-row">
            {row1.map(renderArticleCard)}
          </div>
          <div className="carousel-row">
            {row2.map(renderArticleCard)}
          </div>
        </div>
        
        <button 
          onClick={goToNext}
          disabled={currentSlide === totalSlides - 1}
          className="carousel-arrow next"
          aria-label="Artículos siguientes"
        >
          ›
        </button>
      </div>
      
      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
              aria-current={currentSlide === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;