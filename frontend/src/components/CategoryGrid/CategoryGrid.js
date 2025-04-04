import React from 'react';
import './CategoryGrid.css';

const CategoryGrid = ({ category }) => {
  // Base de datos simulada más completa
  const allPosts = [
    // Transformación Digital (8 posts)
    {
      id: 1, 
      title: "Guía completa de Transformación Digital para PYMES",
      excerpt: "Cómo implementar procesos digitales en cobranzas y facturación",
      date: "Abril 15, 2025",
      readTime: "8 min",
      category: "Transformacion Digital"
    },
    {
      id: 2,
      title: "Automatización de Facturas Electrónicas 2025",
      excerpt: "Reducción de tiempos con tecnología digital avanzada",
      date: "Marzo 28, 2025",
      readTime: "6 min",
      category: "Transformacion Digital"
    },
    // ... +6 posts más para Transformación Digital
    
    // Inteligencia Artificial (7 posts)
    {
      id: 9,
      title: "IA para Prevención de Morosidad 2025",
      excerpt: "Modelos predictivos con machine learning para cobranza",
      date: "Mayo 5, 2025",
      readTime: "10 min",
      category: "Inteligencia Artificial"
    },
    // ... +6 posts más para IA
    
    // Empresas (9 posts)
    {
      id: 17,
      title: "Top 100 Empresas Digitales 2025",
      excerpt: "Ranking completo de las empresas más innovadoras",
      date: "Junio 12, 2025",
      readTime: "12 min",
      category: "Empresas"
    },
    // ... +8 posts más para Empresas
    
    // Tecnología (6 posts)
    {
      id: 26,
      title: "Blockchain en Cobranzas Automatizadas",
      excerpt: "Cómo está revolucionando los pagos empresariales",
      date: "Julio 3, 2025",
      readTime: "7 min",
      category: "Tecnologia"
    },
    // ... +5 posts más para Tecnología
    
    // Programación (7 posts)
    {
      id: 33,
      title: "APIs para Integración de Sistemas de Pago",
      excerpt: "Guía práctica para desarrolladores",
      date: "Agosto 9, 2025",
      readTime: "9 min",
      category: "Programacion"
    }
    // ... +6 posts más para Programación
  ];

  // Filtrar posts según categoría seleccionada
  const filteredPosts = category === 'Todos' 
    ? allPosts 
    : allPosts.filter(post => post.category === category);

  return (
    <div className="category-grid">
      <h3 className="grid-title">
        {category === 'Todos' ? 'Últimas Publicaciones' : `Publicaciones sobre ${category}`}
      </h3>
      <div className="grid-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-date">{post.date}</span>
              <span className="read-time">{post.readTime}</span>
            </div>
            <h4>{post.title}</h4>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-footer">
              <a href="#" className="read-more">Leer más →</a>
              <span className="post-category">{post.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;