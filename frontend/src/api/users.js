import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/private';
//const API_URL = 'http://localhost:8000/api/private';

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api = {
  // Autenticación
  login: async (credentials) => {
//    console.log("Llamando a la API con:", credentials); // ← ¿Se imprime esto?
    const response = await axios.post(`${API_URL}/login/`, credentials);
    return response.data;
  },
  
  getCurrentUser: async (token) => {
    const response = await axios.get(`${API_URL}/me/`, getAuthHeaders(token));
    return response.data;
  },
  
  // Usuarios
  getUsers: async (token) => {
    const response = await axios.get(`${API_URL}/usuarios/`, getAuthHeaders(token));
    return response.data;
  },
  
  createUser: async (data, token) => {
    const response = await axios.post(`${API_URL}/usuarios/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  updateUser: async (id, data, token) => {
    const response = await axios.put(`${API_URL}/usuarios/${id}/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  deleteUser: async (id, token) => {
    await axios.delete(`${API_URL}/usuarios/${id}/`, getAuthHeaders(token));
  },
  
  // Roles
  getRoles: async (token) => {
    const response = await axios.get(`${API_URL}/roles/`, getAuthHeaders(token));
    return response.data;
  },
  
  createRole: async (data, token) => {
    const response = await axios.post(`${API_URL}/roles/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  updateRole: async (id, data, token) => {
    const response = await axios.put(`${API_URL}/roles/${id}/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  deleteRole: async (id, token) => {
    await axios.delete(`${API_URL}/roles/${id}/`, getAuthHeaders(token));
  },
  
  // Permisos
  getPermissions: async (token) => {
    const response = await axios.get(`${API_URL}/permissions/`, getAuthHeaders(token));
    return response.data;
  },
  
  // Asignaciones
  getUserRoles: async (userId, token) => {
    const response = await axios.get(`${API_URL}/usuarios/${userId}/roles/`, getAuthHeaders(token));
    return response.data;
  },
  
  assignUserRole: async (data, token) => {
    const response = await axios.post(`${API_URL}/user-roles/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  removeUserRole: async (id, token) => {
    await axios.delete(`${API_URL}/user-roles/${id}/`, getAuthHeaders(token));
  },
  
  getRolePermissions: async (roleId, token) => {
    const response = await axios.get(`${API_URL}/roles/${roleId}/permissions/`, getAuthHeaders(token));
    return response.data;
  },
  
  assignRolePermission: async (data, token) => {
    const response = await axios.post(`${API_URL}/role-permissions/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  removeRolePermission: async (id, token) => {
    await axios.delete(`${API_URL}/role-permissions/${id}/`, getAuthHeaders(token));
  },
};
export default api;