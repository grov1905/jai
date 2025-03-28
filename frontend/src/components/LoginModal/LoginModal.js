import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

const LoginModal = ({ onClose, onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login/`,  
                { email, password }
            );
            
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            onLogin(response.data.user);
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Credenciales inválidas');
        }
    };


    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Lógica para recuperación de contraseña
        alert('Función de recuperación de contraseña será implementada pronto');
    };

    return (
        <div className="login-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Iniciar sesión</h2>
                    {error && <div className="error-message">
                        <svg className="error-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
                        </svg>
                        {error}
                    </div>}
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-button">Iniciar sesión</button>
                </form>
                
                <div className="modal-footer">
                    <button className="close-button" onClick={onClose}>Cerrar</button>
                    <div className="footer-links">

                    <button 
                            className="footer-link" 
                            onClick={handleForgotPassword}
                        >
                            ¿Olvidaste contraseña?
                        </button>

                        <button 
                            className="footer-link" 
                            onClick={() => onSwitchToRegister()}
                        >
                            Regístrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;