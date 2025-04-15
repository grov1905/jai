// hooks/useArticleContent.ts
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Article } from '@/types/blog';

export const useArticleContent = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/${id}/`
        );
        setArticle(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return { article, isLoading, error };
};