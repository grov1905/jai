import React, { useState, useEffect, useRef } from 'react';
import HeroBlog from '../../components/HeroBlog/HeroBlog';
import ArticleList from '../../components/ArticleList/ArticleList';
import './BlogPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BannerBlog from '../../components/BannerBlog/BannerBlog';
import CallToAction from '../../components/CallToAction/CallToAction';
import Tags from '../../components/Tags/Tags';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import axios from 'axios';

const BlogPage = () => {
  const scrollPositionRef = useRef(0);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar datos (optimizada para pre-render)
  const fetchData = async () => {
    if (typeof window === 'undefined') return; // No ejecutar durante pre-render

    try {
      setLoading(true);
      
      const [featuredResponse, articlesResponse, categoriesResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog/articulos/destacados/`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog/articulos/recientes/`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog/categorias/principales/`)
      ]);

      if (featuredResponse.data.length > 0) {
        setFeaturedArticle(featuredResponse.data[0]);
      }
      
      setAllArticles(articlesResponse.data);
      setFilteredArticles(articlesResponse.data);
      setCategories(categoriesResponse.data);
      
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para manejar clic en artículo (optimizada)
  const handleArticleClick = (article) => {
    setFeaturedArticle(article);
    
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      axios.post(`${process.env.REACT_APP_API_URL}/api/blog/articulos/${article.id}/registrar_lectura/`, {
        tiempo_lectura: article.tiempo_lectura * 60,
        completado: false
      }).catch(console.error);
      
      axios.get(`${process.env.REACT_APP_API_URL}/api/blog/articulos/${article.id}/visitar/`)
        .catch(console.error);
    }
  };

  // Función para seleccionar categoría (optimizada)
  const handleCategorySelect = async (slug) => {
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    
    setSelectedCategory(slug);
    try {
      setLoading(true);
      
      const response = slug === 'todos'
        ? await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/articulos/recientes/`)
        : await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/articulos/por-categoria/${slug}/`);
      
      setFilteredArticles(response.data.articulos || response.data);
    } catch (err) {
      setError(err.message || 'Error al filtrar artículos');
    } finally {
      setLoading(false);
      
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPositionRef.current,
            behavior: 'instant'
          });
        });
      }
    }
  };

  // Render para pre-render (sin datos)
  if (typeof window === 'undefined') {
    return (
      <div className="blog-page">
        <Header />
        <BannerBlog 
          title="Innovación y Tecnología para el Futuro de tu Empresa"
          subtitle="Soluciones innovadoras en tecnología y transformación digital."
        />
        <div className="blog-container">
          <p>Cargando contenido del blog...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="blog-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando contenido...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <Header />
        <div className="error-container">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Header />
      <BannerBlog 
        title="Innovación y Tecnología para el Futuro de tu Empresa"
        subtitle="Soluciones innovadoras en tecnología y transformación digital."
      />
      
      <div className="blog-container">
        <div className="blog-columns">
          <div className="blog-hero-column">
            {featuredArticle && (
              <HeroBlog 
                article={featuredArticle} 
                onArticleClick={handleArticleClick}
              />
            )}
          </div>
          <div className="blog-articles-column">
            <ArticleList 
              articles={allArticles} 
              itemsPerPage={3} 
              onArticleClick={handleArticleClick}
            />
          </div>
        </div>
        
        <CallToAction
          title="¿Listo para transformar tu empresa?"
          buttonText="Contáctanos hoy"
        />
        
        <Tags 
          tags={categories}
          selectedTag={selectedCategory}
          onTagSelect={handleCategorySelect}
        />
        
        <CategoryGrid 
          category={selectedCategory}
          articles={filteredArticles}
          onArticleClick={handleArticleClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;