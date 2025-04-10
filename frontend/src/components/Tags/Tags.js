import React, { useState, useEffect } from 'react';
import './Tags.css';

const Tags = ({ tags = [], selectedTag, onTagSelect }) => {
  const [isClient, setIsClient] = useState(false);
  
  // Detect client-side after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Normalize tags (works on both server and client)
  const normalizedTags = tags.map(tag => ({
    nombre: tag.nombre || tag.name || '',
    slug: tag.slug || (tag.nombre || '').toLowerCase().replace(/\s+/g, '-')
  }));

  // Prepare tags array (including "Todos" option)
  const allTags = [
    { nombre: 'Todos', slug: 'todos' },
    ...normalizedTags
  ];

  // Client-side click handler
  const handleTagClick = (slug) => {
    if (isClient) {
      onTagSelect(slug);
    }
  };

  // If not on client side, render basic version without interactivity
  if (!isClient) {
    return (
      <div className="tags-section">
        <p className="tags-title">Filtrar por categoría:</p>
        <div className="tags-container">
          {allTags.map((tag) => (
            <span
              key={tag.slug}
              className={`tag ${selectedTag === tag.slug ? 'active' : ''}`}
            >
              {tag.nombre}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Full interactive version for client-side
  return (
    <div className="tags-section">
      <p className="tags-title">Filtrar por categoría:</p>
      <div className="tags-container">
        {allTags.map((tag) => (
          <button
            key={tag.slug}
            className={`tag ${selectedTag === tag.slug ? 'active' : ''}`}
            onClick={() => handleTagClick(tag.slug)}
            type="button"
            aria-pressed={selectedTag === tag.slug}
            aria-label={`Filtrar por ${tag.nombre}`}
          >
            {tag.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tags;