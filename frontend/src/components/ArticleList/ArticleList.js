import React from 'react';
import './ArticleList.css';

const ArticleList = ({ onArticleClick }) => {
  const articles = [
    {
      id: 1,
      date: "February 1, 2025",
      title: "Top 6 Mejores Software de Cobranza de Chile del 2025",
      content: "¿Buscas el mejor software de cobranza para 2025? ¡Acá lo tienes!"
    },
    {
      id: 2,
      date: "May 30, 2024",
      title: "¿Qué es un director financiero (CFO)?",
      content: "Funciones, capacidades y la tecnología que lo puede ayudar."
    },
    {
      id: 3,
      date: "May 28, 2024",
      title: "5 indicadores claves para la gestión de cobranzas",
      content: "Mide lo que importa para optimizar tu proceso de cobranza."
    },
    {
      id: 4,
      date: "February 22, 2024",
      title: "Gestión de deudas:",
      content: "¿Cómo reducir el riesgo de los impagos de cobranza?"
    }
  ];

  return (
    <div className="article-list-container">
      {articles.map((article) => (
        <div 
          key={article.id} 
          className="article-card"
          onClick={() => onArticleClick(article)}
        >
          <span className="article-date">{article.date}</span>
          <h3 className="article-title">{article.title}</h3>
          {article.content && <p className="article-content">{article.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;