// hooks/useRelatedArticles.ts
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Article, Category} from '@/types/blog';

export const useRelatedArticles = (currentArticleId: string) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Primero obtener el artículo actual para saber sus categorías
        const currentArticleResponse = await axios.get<{
          categorias: Category[];
          // otras propiedades del artículo si las hay
        }>(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/${currentArticleId}/`, {
          signal: controller.signal
        });

        const categories = currentArticleResponse.data.categorias;
        
        if (!categories || categories.length === 0) {
          if (isMounted) {
            setRelatedArticles([]);
            setLoading(false);
          }
          return;
        }

        // Obtener artículos relacionados para las categorías del artículo actual
        const requests = categories.map(category => 
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/por-categoria/${category.slug}/`,
            { signal: controller.signal }
          )
        );

        const responses = await Promise.all(requests);
        
        if (isMounted) {
          const allArticles = responses.flatMap(response => 
            response.data.articulos || response.data || []
          );
          
          const uniqueArticles = allArticles
            .filter(article => article.id !== currentArticleId) // Eliminar el artículo actual por ID
            .filter((article, index, self) => // Eliminar duplicados
              index === self.findIndex(a => a.id === article.id)
            )
            .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
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

    fetchRelatedArticles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentArticleId]);

  return { relatedArticles, loading, error };
};