// src/hooks/useCategoryArticles.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Article } from '@/types/blog';

interface UseCategoryArticlesReturn {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}
interface ArticlesResponse {
  articulos: Article[];
}

const useCategoryArticles = (slug: string): UseCategoryArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const url = slug === 'todos'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/recientes/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/por-categoria/${slug}/`;
        
        const response = await axios.get<Article[] | ArticlesResponse>(url);

         // Normalizamos el resultado
         if (Array.isArray(response.data)) {
          setArticles(response.data);
        }  else if (response.data?.articulos && Array.isArray(response.data.articulos)) {
          setArticles(response.data.articulos);
        } else {
          setArticles([]);
          console.warn('[useCategoryArticles] Formato desconocido:', response.data);
        }
        //setArticles(response.data);
        


      } catch (err) {
        setError('Error al cargar artículos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  return { articles, isLoading, error };
};

export default useCategoryArticles;





