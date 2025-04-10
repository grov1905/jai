import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RelatedArticles.css';

const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/default-article-image.jpg';

const RelatedArticles = ({ articleId, currentSlug, categories }) => {
  const navigate = useNavigate();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Si no hay categorías, mostrar vacío
        if (!categories || categories.length === 0) {
          if (isMounted) {
            setRelatedArticles([]);
            setLoading(false);
          }
          return;
        }

        // Obtener artículos relacionados para todas las categorías
        const requests = categories.map(category => 
          axios.get(
            `${process.env.REACT_APP_API_URL}/api/blog/articulos/por-categoria/${category.slug}/`,
            { signal: controller.signal }
          )
        );

        const responses = await Promise.all(requests);
        
        if (isMounted) {
          // Combinar todos los resultados y eliminar duplicados
          const allArticles = responses.flatMap(response => 
            response.data.articulos || response.data || []
          );
          
          // Filtrar y ordenar
          const uniqueArticles = allArticles
            .filter(article => article.slug !== currentSlug) // Eliminar el artículo actual
            .filter((article, index, self) => // Eliminar duplicados
              index === self.findIndex(a => a.id === article.id)
            )
            .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)) // Ordenar por fecha
            .slice(0, 6); // Limitar a 6 artículos

          setRelatedArticles(uniqueArticles);
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error('Error fetching related articles:', {
            error: err,
            response: err.response?.data
          });
          setError('No se pudieron cargar artículos relacionados');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRelatedArticles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [categories, currentSlug]);

  const handleArticleClick = (slug) => {
    navigate(`/blog/articulo/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    if (e.target.src !== DEFAULT_IMAGE) {
      e.target.src = DEFAULT_IMAGE;
    }
  };

  if (loading) {
    return (
      <div className="related-articles">
        <h3 className="related-title">Artículos relacionados</h3>
        <div className="loading-related">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="related-articles">
        <h3 className="related-title">Artículos relacionados</h3>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return (
      <div className="related-articles">
        <h3 className="related-title">Artículos relacionados</h3>
        <div className="empty-message">
          <p>No hay artículos relacionados disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="related-articles">
      <h3 className="related-title">Artículos relacionados</h3>
      <div className="related-list">
        {relatedArticles.map(article => (
          <div 
            key={`${article.id}-${article.slug}`} 
            className="related-card"
            onClick={() => handleArticleClick(article.id)}
          >
            <div className="related-image-container">
              <img 
                src={article.imagen_portada_url || DEFAULT_IMAGE}
                alt={article.titulo}
                className="related-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            <div className="related-content">
              <h4 className="related-article-title">{article.titulo}</h4>
              <p className="related-article-subtitle">{article.subtitulo}</p>
              <div className="related-meta">
                <span className="related-date">
                  {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className="related-reading-time">
                  {article.tiempo_lectura} min lectura
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;