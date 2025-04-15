'use client';

import { useRouter } from 'next/navigation';
import { useRelatedArticles } from '@/hooks/useRelatedArticles';

import Image from 'next/image';

const DEFAULT_IMAGE = '/images/default-article-image.jpg';

interface RelatedArticlesProps {
  currentArticleId: string;
}

export const RelatedArticles = ({ currentArticleId }: RelatedArticlesProps) => {
  const router = useRouter();
  const { relatedArticles, loading, error } = useRelatedArticles(currentArticleId);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/blog/articlePage/${id}`);
    window.scrollTo(0, 0);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    if (target.src !== DEFAULT_IMAGE) {
      target.src = DEFAULT_IMAGE;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b-2 border-blue-100">
          Artículos relacionados
        </h3>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b-2 border-blue-100">
          Artículos relacionados
        </h3>
        <div className="text-center py-4 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b-2 border-blue-100">
          Artículos relacionados
        </h3>
        <div className="text-center py-4 text-gray-500">
          <p>No hay artículos relacionados disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md lg:sticky lg:top-5">
      <h3 className="text-[1.3rem] text-primary mb-6 pb-3 border-b-2 border-primary-light max-md:text-[1.2rem]">
        Artículos relacionados
      </h3>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(302px,1fr))] max-md:grid-cols-1">
        {relatedArticles.map(article => (
          <div 
            key={article.id}
            onClick={() => handleArticleClick(article.id)}
            className="group flex gap-4 cursor-pointer transition-transform duration-300 ease-in-out
              rounded-lg overflow-hidden hover:-translate-y-[3px]
              max-md:flex-col"
          >
            <div className="flex-none w-[150px] max-md:w-full">
            <Image 
                    src={article.imagen_portada_url || DEFAULT_IMAGE}
                    alt={article.titulo}
                    width={150}
                    height={100}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    onError={handleImageError}
                    loading="lazy"
                    unoptimized={true} 
                />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <h4 className="text-[15px] text-primary mb-[0.3rem] leading-[1.3] line-clamp-2">
                {article.titulo}
              </h4>
              <p className="text-[13px] text-gray-500 mb-2 line-clamp-3 min-h-[3.5rem] leading-snug">
                {article.subtitulo}
              </p>
              <div className="flex gap-3 text-xs text-gray-500">
                <span className="mr-1">
                  {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className="mr-1">{article.tiempo_lectura_minutos}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};