import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RelatedArticles.css';

const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/default-article-image.jpg';

const RelatedArticles = ({ articleId, currentSlug, categories = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!isClient || !categories || categories.length === 0) {
          if (isMounted) {
            setRelatedArticles([]);
            setLoading(false);
          }
          return;
        }

        const requests = categories.map(category => 
          axios.get(
            `${process.env.REACT_APP_API_URL}/api/blog/articulos/por-categoria/${category.slug}/`,
            { signal: controller.signal }
          )
        );

        const responses = await Promise.all(requests);
        
        if (isMounted) {
          const allArticles = responses.flatMap(response => 
            response.data.articulos || response.data || []
          );
          
          const uniqueArticles = allArticles
            .filter(article => article.slug !== currentSlug)
            .filter((article, index, self) =>
              index === self.findIndex(a => a.id === article.id)
            )
            .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion))
            .slice(0, 6);

          setRelatedArticles(uniqueArticles);
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error('Error fetching related articles:', err);
          setError('No se pudieron cargar artículos relacionados');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (isClient) {
      fetchRelatedArticles();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [categories, currentSlug, isClient]);

  const handleArticleClick = (slug) => {
    if (isClient) {
      navigate(`/blog/articulo/${slug}`);
      window.scrollTo(0, 0);
    }
  };

  const handleImageError = (e) => {
    if (e.target.src !== DEFAULT_IMAGE) {
      e.target.src = DEFAULT_IMAGE;
    }
  };

  // Format date consistently for both server and client
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Render article card (used for both server and client)
  const renderArticleCard = (article) => (
    <div 
      key={`${article.id}-${article.slug}`}
      className="related-card"
      onClick={() => handleArticleClick(article.id)}
      role="button"
      tabIndex={0}
      aria-label={`Leer artículo: ${article.titulo}`}
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
        {article.subtitulo && (
          <p className="related-article-subtitle">{article.subtitulo}</p>
        )}
        <div className="related-meta">
          <span className="related-date">{formatDate(article.fecha_publicacion)}</span>
          <span className="related-reading-time">
            {article.tiempo_lectura} min lectura
          </span>
        </div>
      </div>
    </div>
  );

  // Render for pre-render (without client-side features)
  if (!isClient) {
    return (
      <div className="related-articles">
        <h3 className="related-title">Artículos relacionados</h3>
        <div className="related-list">
          {[...Array(3)].map((_, i) => (
            <div key={`placeholder-${i}`} className="related-card">
              <div className="related-image-container">
                <img 
                  src={DEFAULT_IMAGE}
                  alt="Artículo relacionado"
                  className="related-image"
                  loading="lazy"
                />
              </div>
              <div className="related-content">
                <h4 className="related-article-title">Cargando artículo...</h4>
                <div className="related-meta">
                  <span className="related-date">Cargando fecha</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {relatedArticles.map(renderArticleCard)}
      </div>
    </div>
  );
};

export default RelatedArticles;