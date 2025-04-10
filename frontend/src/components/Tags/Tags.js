import React from 'react';
import './Tags.css';

const Tags = ({ tags = [], selectedTag, onTagSelect }) => {
  // Normaliza los tags asegurando estructura {nombre, slug}
  const normalizedTags = tags.map(tag => ({
    nombre: tag.nombre,
    slug: tag.slug || tag.nombre.toLowerCase().replace(/\s+/g, '-')
  }));

  const allTags = [
    { nombre: 'Todos', slug: 'todos' },
    ...normalizedTags
  ];

  return (
    <div className="tags-section">
      <p className="tags-title">Filtrar por categoría:</p>
      <div className="tags-container">
        {allTags.map((tag) => (
          <button
            key={tag.slug}
            className={`tag ${selectedTag === tag.slug ? 'active' : ''}`}
            onClick={() => {
              onTagSelect(tag.slug);
            }}
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