import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';

const container = document.getElementById('root');

// Verificar si hay contenido pre-renderizado (react-snap)
if (container?.hasChildNodes()) {
  // Hidratación para pre-render (producción)
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Renderizado normal (desarrollo)
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Opcional: Medición de performance (se mantiene igual)
reportWebVitals();