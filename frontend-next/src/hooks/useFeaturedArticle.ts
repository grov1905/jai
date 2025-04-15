// src/hooks/useFeaturedArticle.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Article} from "@/types/blog"


export const useFeaturedArticle = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Article[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/articulos/destacados/`
        );
        
        if (response.data.length > 0) {
          setArticle(response.data[0]);
        }
      } catch (err) {
        setError('Error al cargar el artículo destacado');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedArticle();
  }, []);

  return { article, isLoading, error };
};