import React, { useState, useEffect } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/private/me/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    handleLogout();
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setShowLoginModal(false);
    };

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <div className="auth-container">
            {user ? (
                <div className="user-info">
                    <span className="welcome-msg">Bienvenido, {user.username || user.email}</span>
                    <button className="logout-link" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <button 
                    className="login-link" 
                    onClick={() => setShowLoginModal(true)}
                >
                    Iniciar sesión
                </button>
            )}

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                />
            )}
            
            {showRegisterModal && (
                <RegisterModal
                    onClose={() => setShowRegisterModal(false)}
                    onRegisterSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                />
            )}
        </div>
    );
};

export default Login;