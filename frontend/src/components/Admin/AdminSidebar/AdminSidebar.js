import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/articles', icon: 'article', label: 'Artículos' },
    { path: '/admin/categories', icon: 'category', label: 'Categorías' },
    { path: '/admin/tags', icon: 'tag', label: 'Etiquetas' },
    { path: '/admin/comments', icon: 'comment', label: 'Comentarios' },
    { path: '/admin/newsletter', icon: 'email', label: 'Newsletter' },
    { path: '/admin/users', icon: 'people', label: 'Usuarios' },
    { path: '/admin/roles', icon: 'admin_panel_settings', label: 'Roles' },
    { path: '/admin/permissions', icon: 'lock', label: 'Permisos' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Panel Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                <span className="material-icons">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;