import React, { useState } from 'react';
import axios from 'axios';
import './RegisterModal.css';

const RegisterModal = ({ onClose, onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/private/usuarios/`,
                formData
            );
            setSuccess(true);
            setTimeout(() => {
                onRegisterSuccess();
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Error en el registro');
        }
    };

    if (success) {
        return (
            <div className="register-modal">
                <div className="modal-container">
                    <div className="success-message">
                        <svg className="success-icon" viewBox="0 0 24 24">
                            <path fill="#4CAF50" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        <h3>¡Registro exitoso!</h3>
                        <p>Redirigiendo a inicio de sesión...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="register-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Crear cuenta</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                {error && (
                    <div className="error-message">
                        <svg className="error-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">Registrarse</button>
                </form>
                
                <div className="modal-footer">
                    <span>¿Ya tienes cuenta? </span>
                    <button className="switch-btn" onClick={onSwitchToLogin}>
                        Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;