'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentArticles } from '@/hooks/useRecentArticles';
import { Article } from '@/types/blog';

interface ArticleListProps {
  itemsPerPage?: number;
  onArticleClick?: (article: Article) => void;
}

export const ArticleList = ({ itemsPerPage = 5, onArticleClick }: ArticleListProps) => {
  const router = useRouter();
  const { articles, isLoading, error } = useRecentArticles();
  const [currentPage, setCurrentPage] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const currentArticles = articles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  const viewportHeight = 180 * itemsPerPage + 24 * (itemsPerPage - 1);

  const handleArticleClick = (article: Article) => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      router.push(`/blog/articulo/${article.slug}`);
    }
  };

  if (isLoading) return <div className="text-center py-8">Cargando artículos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (articles.length === 0) return <div className="text-center py-8">No hay artículos disponibles</div>;

  return (
    <div className="
      flex flex-col gap-6
      w-full max-w-[800px]
      mx-auto
    ">
      <div 
        className="overflow-hidden transition-[height] duration-300 ease-[ease]"
        style={{ height: `${viewportHeight}px` }}
      >
        <div className="flex flex-col gap-6">
          {currentArticles.map((article) => (
            <div 
              key={article.id}
              className="
                bg-white rounded-[12px] p-[24px]
                shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                transition-all duration-300 ease-[ease]
                border-l-[3px] border-l-transparent
                cursor-pointer h-[180px]
                flex flex-col
                hover:-translate-y-[5px]
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]
                hover:border-l-[#A2B9D6]
                md:p-6 md:h-[180px]
                sm:p-4 sm:h-[150px]
              "
              onClick={() => handleArticleClick(article)}
            >
              <span className="text-gray-500 text-[0.8rem] mb-2">
                {formatDate(article.fecha_publicacion)}
              </span>
              <h3 className="
                text-[#1E2A47] text-[1.1rem]
                font-semibold mb-3
                md:text-[1rem]
              ">
                {article.titulo}
              </h3>
              {article.resumen && (
                <p className="
                  text-gray-600
                  text-[0.95rem]
                  line-clamp-3 flex-grow
                  sm:text-[0.9rem] sm:line-clamp-2
                  leading-relaxed
                ">
                  {article.resumen}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="
        flex justify-between items-center
        mt-4
      ">
        <button 
          onClick={goToPrev}
          disabled={currentPage === 0}
          className="
            bg-[#1E2A47] text-white
            border-none rounded
            px-4 py-2
            font-semibold
            transition-all duration-200 ease-[ease]
            min-w-[100px]
            disabled:bg-gray-300 disabled:cursor-not-allowed
            hover:bg-[#2c3e50]
            sm:px-3 sm:py-1 sm:min-w-[80px] sm:text-[0.85rem]
          "
        >
          Anteriores
        </button>
        
        <span className="
          text-gray-500 text-[0.9rem]
          sm:text-[0.85rem]
        ">
          Página {currentPage + 1} de {totalPages}
        </span>
        
        <button 
          onClick={goToNext}
          disabled={currentPage === totalPages - 1}
          className="
            bg-[#1E2A47] text-white
            border-none rounded
            px-4 py-2
            font-semibold
            transition-all duration-200 ease-[ease]
            min-w-[100px]
            disabled:bg-gray-300 disabled:cursor-not-allowed
            hover:bg-[#2c3e50]
            sm:px-3 sm:py-1 sm:min-w-[80px] sm:text-[0.85rem]
          "
        >
          Siguientes
        </button>
      </div>
    </div>
  );
};