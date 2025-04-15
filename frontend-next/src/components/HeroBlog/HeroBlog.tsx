'use client';

import { useRouter } from 'next/navigation';
import { useFeaturedArticle } from '@/hooks/useFeaturedArticle';
import { DEFAULT_IMAGE } from '@/constants';
import { Article } from '@/types/blog';

interface HeroBlogProps {
  featuredArticle?: Article | null;
}

export const HeroBlog = ({ featuredArticle: propFeaturedArticle }: HeroBlogProps) => {
  const router = useRouter();
  const { article: hookFeaturedArticle, isLoading, error } = useFeaturedArticle();
  
  // Usamos el artículo de las props si está disponible, de lo contrario usamos el del hook
  const article = propFeaturedArticle || hookFeaturedArticle;

  const handleClick = () => {
    if (article) {
      router.push(`/pages/blog/articlePage/${article.id}`);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = DEFAULT_IMAGE;
  };

  if (isLoading) return <div className="text-center py-8">Cargando artículo destacado...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!article) return <div className="text-center py-8">No hay artículos destacados</div>;

  return (
    <div 
      className="
        shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
        transition-all duration-300 ease-[ease]
        rounded-[10px]
        overflow-hidden
        cursor-pointer
        flex flex-col
        hover:shadow-[0px_8px_20px_rgba(0,0,0,0.2)]
        hover:-translate-y-[10px]
      "
      onClick={handleClick}
    >
      <div className="w-full h-[300px] overflow-hidden">
        <img 
          src={article.imagen_portada_url || DEFAULT_IMAGE}
          alt={article.titulo}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-[ease]
            group-hover:scale-[1.05]
          "
          onError={handleImageError}
        />
      </div>
      
      <div className="p-8 bg-white">
        <div className="
          bg-[linear-gradient(160deg,#A2B9D6,#B0C4DE)]
          text-white
          p-[1.5rem]
          rounded-[12px]
          shadow-[0_10px_20px_rgba(0,0,0,0.1)]
          -mt-16
          relative
          z-10
          mb-8
        ">
          <h1 className="text-[#1E2A47] text-[2.2rem] leading-[1.3] mb-[1rem]">
            {article.titulo}
          </h1>
          <p className="text-[#1E2A47] text-[1rem] leading-[1.7] opacity-95 mb-4">
            {article.subtitulo}
          </p>
        </div>
        
        <div className="text-[#1E2A47] text-[1.15rem] opacity-95">
          <p className="text-[1.15rem] leading-[1.6] opacity-95 mb-8">
            {article.resumen}
          </p>
          
          <div className="mt-6 leading-[1.6]">
            <div className="flex gap-5 mb-6 flex-wrap">
              <span className="text-[#1E2A47] text-[0.95rem] opacity-90">
                <strong className="text-[#1E2A47] font-semibold">Publicado: </strong>
                {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) || "Fecha no disponible"}
              </span>
              <span className="text-[#1E2A47] text-[0.95rem] opacity-90">
                <strong className="text-[#1E2A47] font-semibold">Categoría:</strong> 
                {article.categorias[0]?.nombre || "General"}
              </span>
              <span className="text-[#1E2A47] text-[0.95rem] opacity-90">
                <strong className="text-[#1E2A47] font-semibold">Actualizado:</strong> 
                {new Date(article.fecha_actualizacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) || "Fecha no disponible"}
              </span>
            </div>
            
            <button 
              className="
                bg-transparent border-none
                text-[#1E2A47] text-[1rem]
                font-semibold
                py-2 px-0
                cursor-pointer
                transition-colors duration-300 ease-[ease]
                inline-block
                hover:text-[#2c3e50] hover:underline
              "
            >
              Leer artículo completo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};