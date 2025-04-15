// src/hooks/useRecentArticles.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Article} from "@/types/blog" // Reutilizamos la interfaz

export const useRecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentArticles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Article[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/recientes/`
      );
      setArticles(response.data);
    } catch (err) {
      setError('Error al cargar artículos recientes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  return { articles, isLoading, error, refresh: fetchRecentArticles };
};