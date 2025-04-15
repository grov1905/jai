// src/components/CategoryGrid/CategoryGrid.tsx
'use client';

import React, { useState, useEffect } from 'react';
import useCategoryArticles from '@/hooks/useCategoryArticles';
import { Article } from '@/types/blog';

interface CategoryGridProps {
  slug: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ slug }) => {


  const { articles, isLoading, error } = useCategoryArticles(slug);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]);
  const [categoryName, setCategoryName] = useState<string>(slug);

  const itemsPerSlide = 6;

  useEffect(() => {
    // Reset slide cuando cambia la categoría
    setCurrentSlide(0);

    // Asegurar que articles es un array antes de usarlo
    if (Array.isArray(articles)) {
      setDisplayArticles(articles);
      if (slug !== 'todos') {
        // Buscar el nombre de la categoría en los artículos
        const foundCategory = articles.find(article => 
          article.categorias?.some(cat => cat.slug === slug)
        )?.categorias?.find(cat => cat.slug === slug);
        
        if (foundCategory) {
          setCategoryName(foundCategory.nombre);
        }
      }
    } else {
      setDisplayArticles([]);

    }
  }, [articles,slug]);

  const totalSlides = Math.ceil(displayArticles.length / itemsPerSlide);
  const currentItems = displayArticles.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  // Dividir en 2 filas
  const row1 = currentItems.slice(0, 3);
  const row2 = currentItems.slice(3, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const goToNext = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const goToPrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  if (isLoading) return (
    <div className="max-w-6xl mx-auto my-16 px-8">
      <div className="animate-pulse bg-gray-200 h-10 w-64 mx-auto rounded mb-10"></div>
      <div className="grid grid-cols-3 gap-7">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-7 shadow-md h-80">
            <div className="animate-pulse space-y-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto my-16 px-8 text-center text-red-500">
      Error al cargar los artículos. Por favor intenta nuevamente.
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto my-16 px-8 animate-fadeIn">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-10">
        {slug === 'todos' ? 'Últimas Publicaciones' : `Publicaciones sobre ${categoryName}`}
      </h2>
      
      {displayArticles.length > 0 ? (
        <>
          <div className="relative flex items-center">
            <button 
              onClick={goToPrev}
              disabled={currentSlide === 0}
              className={`absolute -left-6 z-10 w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center transition-all ${
                currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-110'
              }`}
            >
              ‹
            </button>
            
            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
                {row1.map(article => (
                  <ArticleCard key={article.id} article={article} formatDate={formatDate} slug={slug}
                  categoryName={categoryName} />
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {row2.map(article => (
                  <ArticleCard key={`${article.id}-2`} article={article} formatDate={formatDate} slug={slug}
                  categoryName={categoryName}/>
                ))}
              </div>
            </div>
            
            <button 
              onClick={goToNext}
              disabled={currentSlide === totalSlides - 1}
              className={`absolute -right-6 z-10 w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center transition-all ${
                currentSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-110'
              }`}
            >
              ›
            </button>
          </div>
          
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-gray-800 scale-125' : 'bg-gray-200 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Cargando artículos...</p>
          </div>
        )
      )}
    </div>
  );
};

const ArticleCard = ({ article, slug, categoryName, formatDate }: { 
    article: Article; 
    slug: string;
    categoryName: string;
    formatDate: (date: string) => string 
  }) => {
  
    return (
      <div className="bg-white rounded-xl p-7 shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col h-full">
        <div className="flex justify-between items-center mb-5">
          <span className="text-sm text-gray-600">{formatDate(article.fecha_publicacion)}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
            {article.tiempo_lectura_minutos}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2">{article.titulo}</h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{article.resumen}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <a 
            href={`/pages/blog/articlePage/${article.id}`} 
            className="text-gray-800 font-bold hover:text-blue-600 transition-colors"
          >
            Leer más →
          </a>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
            {slug === 'todos' ? article.categorias[0]?.nombre  :  categoryName || 'General' }
          </span>
        </div>
      </div>
    );
  };

export default CategoryGrid;

