import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage/ArticleDetailPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/servicios" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Rutas del blog */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/articulo/:slug" element={<ArticleDetailPage />} />
                
                {/* Ruta para páginas no encontradas */}
                <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;