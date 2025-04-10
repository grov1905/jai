import React, { useState } from 'react';
import './CategoryGrid.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const CategoryGrid = ({ category, articles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 6; // 3 columnas × 2 filas
  const totalSlides = Math.ceil(articles.length / itemsPerSlide);

  const currentItems = articles.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  // Dividir en 2 filas de 3 artículos cada una
  const row1 = currentItems.slice(0, 3);
  const row2 = currentItems.slice(3, 6);

  const goToNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };

  const goToPrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

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
        >
          ‹
        </button>
        
        <div className="carousel-slide">
          {/* Fila 1 */}
          <div className="carousel-row">
            {row1.map(article => (
              <div key={article.id} className="grid-item">
                <div className="post-card">
                  <div className="post-header">
                    <span className="post-date">{formatDate(article.fecha_publicacion)}</span>
                    <span className="read-time">{article.tiempo_lectura}</span>
                  </div>
                  <h3>{article.titulo}</h3>
                  <p className="post-excerpt">{article.resumen}</p>
                  <div className="post-footer">
                    <a href={`blog/articulo/${article.id}`} className="read-more">Leer más →</a>
                    <span className="post-category">{article.categoria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fila 2 */}
          <div className="carousel-row">
            {row2.map(article => (
              <div key={`${article.id}-2`} className="grid-item">
                <div className="post-card">
                  <div className="post-header">
                    <span className="post-date">{formatDate(article.fecha_publicacion)}</span>
                    <span className="read-time">{article.tiempo_lectura}</span>
                  </div>
                  <h3>{article.titulo}</h3>
                  <p className="post-excerpt">{article.resumen}</p>
                  <div className="post-footer">
                    <a href={`blog/articulo/${article.id}`} className="read-more">Leer más →</a>
                    <span className="post-category">{article.categoria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={goToNext}
          disabled={currentSlide === totalSlides - 1}
          className="carousel-arrow next"
        >
          ›
        </button>
      </div>
      
      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;