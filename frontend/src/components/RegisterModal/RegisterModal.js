import React, { useState } from 'react';
import axios from 'axios';
import './RegisterModal.css';

const RegisterModal = ({ onClose, onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/register/`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
                    // Opción 1: Usar el valor directamente sin depender del estado
            setTimeout(() => {
                // Esto forzará mostrar el mensaje de éxito
                setRegistrationSuccess(true);
                
                // Cerrar después de 3 segundos
                setTimeout(() => onClose(), 3000);
            }, 0);
            

            onRegisterSuccess(response.data.user);
            
            
        } catch (err) {
            console.error('Error en registro:', err); // Debug
            if (err.response?.data) {
                const errorData = err.response.data;
                if (typeof errorData === 'object') {
                    setError(Object.values(errorData).flat().join(', '));
                } else {
                    setError(errorData.toString());
                }
            } else {
                setError('Error en el registro');
            }
        }
    };


    if (registrationSuccess) {
        return (
            <div className="register-modal">
                <div className="modal-content success-content">
                    <div className="success-message">
                        <svg className="success-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                        </svg>
                        <p>¡Registro exitoso!</p>
                        <p>Por favor inicia sesión con tus credenciales</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="register-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Regístrate</h2>
                    {error && <div className="error-message">
                        <svg className="error-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
                        </svg>
                        {error}
                    </div>}
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="register-input"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="register-input"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="register-input"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="register-button">Registrarse</button>
                </form>
                
                <div className="login-redirect">
                    <span>¿Ya tienes cuenta? </span>
                    <button className="text-button" onClick={() => onSwitchToLogin()}>
                        Inicia sesión
                    </button>
                </div>
                
                <div className="modal-footer">
                    <button className="close-button" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;