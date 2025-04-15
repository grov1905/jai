'use client';

import { useArticleContent } from '@/hooks/useArticleContent';
import { Article } from '@/types/blog';
import { useState } from 'react';

interface ArticleContentProps {
  articleId: string;
}

const DEFAULT_IMAGE = '/images/default-article-image.jpg';

export const ArticleContent = ({ articleId }: ArticleContentProps) => {
  const { article, isLoading, error } = useArticleContent(articleId);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = DEFAULT_IMAGE;
  };

  const renderVideoOrImage = () => {
    if (!article) return null;

    // Si no hay contenido, mostrar solo la imagen
    if (!article.contenido) {
      return (
        <div className="my-8 rounded-lg overflow-hidden shadow-md">
          <img 
            src={article.imagen_portada_url || DEFAULT_IMAGE}
            alt={article.titulo}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg"
            onError={handleImageError}
            loading="lazy"
          />
          {article.imagen_descripcion && (
            <p className="text-sm text-gray-500 italic text-center mt-2">
              {article.imagen_descripcion}
            </p>
          )}
        </div>
      );
    }

    // Extraer video de YouTube si existe en el contenido
    const videoDivRegex = /<div[^>]*data-video[^>]*data-youtube-id="([^"]*)"[^>]*>/;
    const match = article.contenido.match(videoDivRegex);
    
    if (match && match[1]) {
      const youtubeId = match[1];
      return (
        <div className="relative pb-[56.25%] h-0 my-8 rounded-lg overflow-hidden shadow-md">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
            loading="lazy"
          />
        </div>
      );
    }

    // Si no hay video, mostrar la imagen solo si hay URL
    if (article.imagen_portada_url) {
      return (
        <div className="my-8 rounded-lg overflow-hidden shadow-md">
          <img 
            src={article.imagen_portada_url}
            alt={article.titulo}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg"
            onError={handleImageError}
            loading="lazy"
          />
          {article.imagen_descripcion && (
            <p className="text-sm text-gray-500 italic text-center mt-2">
              {article.imagen_descripcion}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gray-600">Cargando artículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 text-center text-red-500">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 text-center">
        <h2 className="text-xl font-bold">Artículo no encontrado</h2>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-md p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-[32px] font-bold text-gray-900 mb-4 leading-tight">
          {article.titulo}
        </h1>
        {article.subtitulo && (
          <h2 className="text-[22.4px] text-gray-600 mb-6 leading-relaxed">
            {article.subtitulo}
          </h2>
        )}
        
        <div className="flex flex-wrap items-center gap-3 text-[15.2px] text-gray-500 mb-6">
          <span className="text-gray-700">
            Por {article.autor?.username || 'Anónimo'}
          </span>
          <span className="opacity-50">•</span>
          <span>
            Publicado el {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="opacity-50">•</span>
          <span>{article.tiempo_lectura_minutos}</span>
          <span className="opacity-50">•</span>
          <span>{article.visitas} visitas</span>
        </div>
        
        {renderVideoOrImage()}
      </header>
      
      <div
        className="prose prose-lg max-w-none text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary-light prose-a:hover:text-primary-light prose-blockquote:border-l-4 prose-blockquote:border-primary-light prose-blockquote:pl-6 prose-blockquote:text-secondary prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: article.contenido }}
      />

      
      <footer className="mt-12 pt-6 border-t border-gray-200">
        {/* Sección de valoración */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Valora este artículo:
          </h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none"
                aria-label={`Calificar con ${star} estrellas`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
};