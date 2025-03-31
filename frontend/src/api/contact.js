// frontend/src/api/contact.js

import axios from 'axios';

// Obtener la URL base desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL;

export const sendContactForm = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/contact/contactform/`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending contact form:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al enviar el formulario de contacto");
    }
};
