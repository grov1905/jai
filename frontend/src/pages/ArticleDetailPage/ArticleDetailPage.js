import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetailPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import RelatedArticles from '../../components/RelatedArticles/RelatedArticles';
import CallToAction from '../../components/CallToAction/CallToAction';

const DEFAULT_ARTICLE_IMAGE = process.env.PUBLIC_URL + '/images/default-article-image.jpg';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blog/articulos/${slug}/`
        );
        setArticle(response.data);

        // Registrar lectura
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/articulos/${response.data.id}/registrar_lectura/`,
          { tiempo_lectura: response.data.tiempo_lectura * 60, completado: true }
        );
        
        // Obtener rating promedio (público)
        const ratingResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blog/votos/promedio/${response.data.id}/`
        );
        setRating(ratingResponse.data.promedio || 0);
        
        // Obtener valoración del usuario (si está autenticado)
        if (localStorage.getItem('access_token')) {
          try {
            const userRatingResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/blog/votos/${response.data.id}/`,
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
              }
            );
            if (userRatingResponse.data && userRatingResponse.data.puntuacion) {
              setUserRating(userRatingResponse.data.puntuacion);
            }
          } catch (err) {
            // No hacer nada si es 404 (usuario no ha votado)
            if (err.response?.status !== 404) {
              console.error('Error al obtener valoración del usuario:', err);
            }
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]);

  const handleRateArticle = async (newRating) => {
    if (!localStorage.getItem('access_token')) {
      alert('Debes iniciar sesión para valorar artículos');
      return;
    }
    
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/blog/votos/`,
        { articulo: article.id, puntuacion: newRating },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      setUserRating(newRating);
      
      // Actualizar rating promedio después de votar
      const ratingResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/votos/promedio/${article.id}/`
      );
      setRating(ratingResponse.data.promedio || 0);
    } catch (err) {
      console.error('Error al votar:', err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error || 'Error al valorar el artículo');
      }
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    if (e.target.src !== DEFAULT_ARTICLE_IMAGE) {
      e.target.src = DEFAULT_ARTICLE_IMAGE;
    }
  };

  const getDisplayRating = () => {
    return hoverRating || userRating || rating;
  };

  if (loading) {
    return (
      <div className="article-detail-page">
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando artículo...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-detail-page">
        <Header />
        <div className="error-container">
          <h2>Error al cargar el artículo</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Intentar de nuevo</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-page">
        <Header />
        <div className="not-found-container">
          <h2>Artículo no encontrado</h2>
          <p>El artículo que buscas no existe o ha sido eliminado.</p>
          <a href="/">Volver al inicio</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <Header />
      
      <div className="article-container">
        <article className="articulo-content">
          <header className="article-header">
            <h1>{article.titulo}</h1>
            {article.subtitulo && <h2>{article.subtitulo}</h2>}
            
            <div className="article-meta">
              <span className="author">Por {article.autor?.username || 'Anónimo'}</span>
              <span className="separator">•</span>
              <span className="date">
                Publicado el {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="separator">•</span>
              <span className="reading-time">{article.tiempo_lectura} min lectura</span>
              <span className="separator">•</span>
              <span className="visits">{article.visitas} visitas</span>
            </div>
            
            {article.imagen_portada_url && (
              <div className="image-container">
                <img 
                  src={article.imagen_portada_url} 
                  alt={article.titulo} 
                  className="article-image"
                  onError={handleImageError}
                />
                {article.imagen_descripcion && (
                  <p className="image-caption">{article.imagen_descripcion}</p>
                )}
              </div>
            )}
          </header>
          
          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: article.contenido }}
          />
          
          <footer className="article-footer">

            {/*             {article.etiquetas && article.etiquetas.length > 0 && (
              <div className="article-tags">
                <h3>Etiquetas:</h3>
                <div className="tags-list">
                  {article.etiquetas.map(tag => (
                    <a key={tag.id} href={`/etiqueta/${tag.slug}`} className="tag">{tag.nombre}</a>
                  ))}
                </div>
              </div>
            )}
              luego se desarrollara las etiquetas
             */}

            <div className="article-rating">
              <h3>Valora este artículo:</h3>
              <div className="rating-info">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star}
                      className={`star ${star <= getDisplayRating() ? 'active' : ''}`}
                      onClick={() => handleRateArticle(star)}
                      onMouseEnter={() => !userRating && setHoverRating(star)}
                      onMouseLeave={() => !userRating && setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {userRating 
                    ? `Tu valoración: ${userRating} estrellas` 
                    : rating > 0 
                      ? `Valoración promedio: ${rating.toFixed(1)} estrellas` 
                      : 'Sé el primero en valorar'}
                </span>
              </div>
            </div>
          </footer>
        </article>
        
        <aside className="article-sidebar">
          <RelatedArticles 
            articleId={article.id} 
            currentSlug={slug}
            categories={article.categorias || []}
          />
        </aside>
      </div>
      
       {/*      <CommentsSection articleId={article.id} /> // luego se implementara esta funcionalidad */} 


      <CallToAction
        title="¿Listo para transformar tu empresa?"
        buttonText="Contáctanos hoy"
      />
      
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;