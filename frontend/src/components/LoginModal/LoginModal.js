import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

const LoginModal = ({ onClose, onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/private/login/`,
                { username, password }
            );
            
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            
            const userResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/private/me/`,
                {
                    headers: {
                        'Authorization': `Bearer ${response.data.access}`
                    }
                }
            );
            
            onLogin(userResponse.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Credenciales inválidas');
        }
    };

    return (
        <div className="login-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Iniciar sesión</h2>
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
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">Iniciar sesión</button>
                </form>
                
                <div className="modal-footer">
                    <div className="footer-links">
                        <button 
                            className="forgot-password" 
                            onClick={() => {/* Aquí iría la función para recuperar contraseña */}}
                        >
                            ¿Olvidaste contraseña?
                        </button>
                        <span>¿No tienes cuenta? </span>
                        <button className="switch-btn" onClick={onSwitchToRegister}>
                            Regístrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;