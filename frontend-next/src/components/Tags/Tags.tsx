// src/components/Tags/Tags.tsx
'use client';

import React from 'react';
import useCategories from '@/hooks/useCategories';
import { Category } from '@/types/blog';

interface TagsProps {
  selectedTag: string;
  onTagSelect: (slug: string) => void;
}

export const Tags: React.FC<TagsProps> = ({ selectedTag, onTagSelect }) => {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm my-8 w-full">
        <p className="text-lg text-gray-700 font-semibold mb-4">Cargando categorías...</p>
        <div className="animate-pulse flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm my-8 w-full">
        <p className="text-lg text-gray-700 font-semibold mb-4">Error al cargar categorías</p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const allTags = [
    { nombre: 'Todos', slug: 'todos' },
    ...categories.map(cat => ({
      nombre: cat.nombre,
      slug: cat.slug
    }))
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md my-8 w-full sticky z-10 top-0">
      <p className="text-[1.1rem] text-[#1E2A47] font-semibold mb-4 px-6">Filtrar por categoría:</p>
      
      <div className="grid [grid-template-columns:repeat(auto-fill,_minmax(150px,_1fr))] sm:grid-cols-3 md:grid-cols-5 gap-[0.8rem] pt-0 px-6 pb-6">
        {allTags.map((tag) => (
          <button
            key={tag.slug}
            className={`
              px-3 py-[0.4rem] rounded-[20px] text-center font-semibold text-[13.5px]
              transition-all duration-200 ease-in-out
              whitespace-nowrap overflow-hidden text-ellipsis
              border border-gray-200
              ${
                selectedTag === tag.slug
                  ? 'bg-gray-800 text-white transform -translate-y-1 shadow-md'
                  : 'bg-gray-50 text-gray-800 hover:bg-blue-100 hover:-translate-y-1 hover:shadow-md'
              }
            `}
            onClick={() => onTagSelect(tag.slug)}
            type="button"
          >
            {tag.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tags;