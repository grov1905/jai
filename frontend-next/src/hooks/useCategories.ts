// src/hooks/useCategories.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '@/types/blog';

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/categorias/principales/`
        );
        setCategories(response.data);
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export default useCategories;