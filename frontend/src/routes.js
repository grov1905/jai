import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage/ArticleDetailPage";
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from "./pages/Admin/DashboardPage/DashboardPage";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ArticlesPage from './pages/Admin/ArticlesPage/ArticlesPage';

import CategoriesPage from './pages/Admin/CategoriesPage/CategoriesPage';
import TagsPage from './pages/Admin/TagsPage/TagsPage';
import CommentsPage from './pages/Admin/CommentsPage/CommentsPage';
import NewsletterPage from './pages/Admin/NewsletterPage/NewsletterPage';
import UsersPage from './pages/Users/UsersPage/UsersPage';
import RolesPage from './pages/Users/RolesPage/RolesPage';
import PermissionsPage from './pages/Users/PermissionsPage/PermissionsPage';
 
import './App.css';

// Versión modificada de AuthProvider que no usa useNavigate internamente
/* const AuthProviderWrapper = ({ children }) => {
  const navigate = useNavigate();
  
  // Mueve aquí la lógica que necesite useNavigate
  const enhancedLogin = async (credentials) => {
    try {
      // ... tu lógica de login ...
      navigate('/admin'); // Redirección después de login
    } catch (error) {
      // ... manejo de errores ...
    }
  };

  return (
     <AuthProvider login={enhancedLogin}> Pasa la función mejorada 
      {children}
    </AuthProvider> 
  );
}; 

*/

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <AdminProvider>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/servicios" element={<ServicesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        
                        {/* Rutas del blog */}
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/articulo/:slug" element={<ArticleDetailPage />} />
                        
                        {/* Ruta de login */}
                         <Route path="/login" element={<LoginPage />} />
                          <Route path="/admin" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                          <Route path="/admin/articles" element={<PrivateRoute><ArticlesPage /></PrivateRoute>} />
                         

                        <Route path="/admin/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
                        <Route path="/admin/tags" element={<PrivateRoute><TagsPage /></PrivateRoute>} />
                        <Route path="/admin/comments" element={<PrivateRoute><CommentsPage /></PrivateRoute>} />
                        <Route path="/admin/newsletter" element={<PrivateRoute><NewsletterPage /></PrivateRoute>} />
                        <Route path="/admin/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
                        <Route path="/admin/roles" element={<PrivateRoute><RolesPage /></PrivateRoute>} />
                        <Route path="/admin/permissions" element={<PrivateRoute><PermissionsPage /></PrivateRoute>} />
 
                        {/* Ruta para páginas no encontradas */}
                        <Route path="*" element={<div>Página no encontrada</div>} />
                    </Routes>
                </AdminProvider>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;