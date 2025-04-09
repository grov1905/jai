import React from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;