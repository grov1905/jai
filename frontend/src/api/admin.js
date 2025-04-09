import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/blog';
//const API_URL = 'http://localhost:8000/api/blog';
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api =  {
  // Artículos
  getArticles: async (token) => {
    const response = await axios.get(`${API_URL}/articulos/`, getAuthHeaders(token));
    return response.data;
  },
  
  getArticle: async (id, token) => {
    const response = await axios.get(`${API_URL}/articulos/${id}/`, getAuthHeaders(token));
    return response.data;
  },
  
  createArticle: async (data, token) => {
    const response = await axios.post(`${API_URL}/articulos/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  updateArticle: async (id, data, token) => {
    const response = await axios.put(`${API_URL}/articulos/${id}/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  deleteArticle: async (id, token) => {
    await axios.delete(`${API_URL}/articulos/${id}/`, getAuthHeaders(token));
  },
  
  // Categorías
  getCategories: async (token) => {
    const response = await axios.get(`${API_URL}/categorias/`, getAuthHeaders(token));
    return response.data;
  },
  
  createCategory: async (data, token) => {
    const response = await axios.post(`${API_URL}/categorias/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  updateCategory: async (id, data, token) => {
    const response = await axios.put(`${API_URL}/categorias/${id}/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  deleteCategory: async (id, token) => {
    await axios.delete(`${API_URL}/categorias/${id}/`, getAuthHeaders(token));
  },
  
  // Etiquetas
  getTags: async (token) => {
    const response = await axios.get(`${API_URL}/etiquetas/`, getAuthHeaders(token));
    return response.data;
  },

  // Comentarios
  getComments: async (token) => {
    const response = await axios.get(`${API_URL}/comentarios/`, getAuthHeaders(token));
    return response.data;
  },

/*   // Newsletter
  getSubscribers: async (token) => {
    const response = await axios.get(`${API_URL}/newsletters/`, getAuthHeaders(token));
    return response.data;
  }, */
  
  // Dashboard Stats
  getDashboardStats: async (token) => {
    const [articles, categories, tags, comments, subscribers, users] = await Promise.all([
      axios.get(`${API_URL}/articulos/`, getAuthHeaders(token)),
      axios.get(`${API_URL}/categorias/`, getAuthHeaders(token)),
      axios.get(`${API_URL}/etiquetas/`, getAuthHeaders(token)),
      axios.get(`${API_URL}/comentarios/`, getAuthHeaders(token)),
      axios.get(`${API_URL}/newsletters/`, getAuthHeaders(token)),
      axios.get(`${process.env.REACT_APP_API_URL}/api/private/usuarios/`, getAuthHeaders(token)),
    ]);
    
    return {
      articles: articles.data.length,
      categories: categories.data.length,
      tags: tags.data.length,
      comments: comments.data.length,
      subscribers: subscribers.data.length,
      users: users.data.length,
    };
  },


 
  
  createTag: async (data, token) => {
    const response = await axios.post(`${API_URL}/etiquetas/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  updateTag: async (id, data, token) => {
    const response = await axios.put(`${API_URL}/etiquetas/${id}/`, data, getAuthHeaders(token));
    return response.data;
  },
  
  deleteTag: async (id, token) => {
    await axios.delete(`${API_URL}/etiquetas/${id}/`, getAuthHeaders(token));
  },
  
 
  
  updateCommentStatus: async (id, status, token) => {
    const response = await axios.patch(
      `${API_URL}/comentarios/${id}/`, 
      { estado: status },
      getAuthHeaders(token)
    );
    return response.data;
  },
  
  
  exportSubscribers: async (token) => {
    const response = await axios.get(
      `${API_URL}/newsletters/export/`, 
      { 
        ...getAuthHeaders(token),
        responseType: 'blob' 
      }
    );
    return response;
  }


};

export default api;