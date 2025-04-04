import React, { useState } from 'react';
import HeroBlog from '../../components/HeroBlog/HeroBlog';
import ArticleList from '../../components/ArticleList/ArticleList';
import './BlogPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BannerBlog from '../../components/BannerBlog/BannerBlog';
import CallToAction from '../../components/CallToAction/CallToAction';
import Tags from '../../components/Tags/Tags';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [featuredArticle, setFeaturedArticle] = useState({
    id: 1,
    date: "February 1, 2025",
    title: "Top 6 Mejores Software de Cobranza de Chile del 2025",
    subtitle: "Análisis comparativo de las mejores soluciones tecnológicas",
    summary: "¿Buscas el mejor software de cobranza para 2025? En este artículo analizamos las 6 mejores opciones disponibles en el mercado chileno, comparando características, precios y beneficios para tu empresa.",
    readTime: "8 min lectura",
    category: "Tecnología"
  });

  const handleArticleClick = (article) => {
    setFeaturedArticle({
      ...article,
      subtitle: article.content || "Descubre más sobre este tema",
      summary: getArticleSummary(article.title),
      readTime: getReadTime(article.title),
      category: getArticleCategory(article.title)
    });
  };

  const getArticleSummary = (title) => {
    const summaries = {
      "Top 6 Mejores Software de Cobranza de Chile del 2025": "Análisis detallado de las principales soluciones de cobranza disponibles en el mercado chileno, con comparativas de características y precios.",
      "¿Qué es un director financiero (CFO)?": "Exploramos las funciones clave de un CFO moderno y cómo la tecnología está transformando este rol estratégico en las empresas.",
      "5 indicadores claves para la gestión de cobranzas": "Los KPIs esenciales que toda empresa debe monitorear para optimizar su proceso de cobranza y mejorar el flujo de caja.",
      "Gestión de deudas:": "Estrategias comprobadas para reducir el riesgo de impagos y mantener una cartera de clientes saludable."
    };
    return summaries[title] || "Descubre más sobre este tema en nuestro artículo completo.";
  };

  const getReadTime = (title) => {
    const times = {
      "Top 6 Mejores Software de Cobranza de Chile del 2025": "8 min lectura",
      "¿Qué es un director financiero (CFO)?": "5 min lectura",
      "5 indicadores claves para la gestión de cobranzas": "6 min lectura",
      "Gestión de deudas:": "7 min lectura"
    };
    return times[title] || "5 min lectura";
  };

  const getArticleCategory = (title) => {
    const categories = {
      "Top 6 Mejores Software de Cobranza de Chile del 2025": "Tecnología",
      "¿Qué es un director financiero (CFO)?": "Gestión",
      "5 indicadores claves para la gestión de cobranzas": "Finanzas",
      "Gestión de deudas:": "Estrategia"
    };
    return categories[title] || "Artículo";
  };

  return (
    <div className="blog-page">
      <Header/>
      <BannerBlog />
      <div className="blog-container">
        <div className="blog-columns">
          <div className="blog-hero-column">
            <HeroBlog article={featuredArticle} />
          </div>
          <div className="blog-articles-column">
            <ArticleList onArticleClick={handleArticleClick} />
          </div>
        </div>
        
        <CallToAction/>
        <Tags onTagSelect={setSelectedCategory} selectedCategory={selectedCategory} />
        <CategoryGrid category={selectedCategory} />
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;