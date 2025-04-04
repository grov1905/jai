import React from 'react';
import './Tags.css';

const Tags = ({ onTagSelect, selectedCategory }) => {
  const tags = [
    "Todos", 
    "Transformacion Digital", 
    "Inteligencia Artificial",
    "Innovaciones", 
    "Tecnologia", 
    "Programacion", 
    "Empresas"
  ];

  return (
    <div className="tags-section">
      <p className="tags-title">Filtrar por categoría:</p>
      <div className="tags-container">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag ${selectedCategory === tag ? 'active' : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tags;