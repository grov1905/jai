import axios from 'axios';

// Configuración global (opcional, pero recomendado para toda la app)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos máximo por petición
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error de conexión';
    console.error('Error en la petición:', errorMessage);
    return Promise.reject(errorMessage);
  }
);

// Servicios específicos
export const ContactService = {
  sendForm: async (data) => {
/*     console.log('data:', data); // ← Añade esto */ 
   try {
      const response = await apiClient.post('/api/public/contact/contactform/', data);
      return response.data;
    } catch (error) {
      // El interceptor ya maneja el logging
      throw error; // Re-lanzamos el error ya formateado
    }
  },

  logWhatsAppClick: async (phoneNumber, message = "Solicitud enviada") => {
    try {
      const response = await apiClient.post('/api/public/contact/whatsapp/log/', {
        phone_number: phoneNumber,
        message: message
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Opcional: También puedes exportar la instancia base si otros módulos la necesitan
export default apiClient;