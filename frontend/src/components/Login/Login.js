import React, { useState, useEffect } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setShowLoginModal(false);
    };

    const handleRegisterSuccess = (userData) => {
        // Solo cerramos los modales sin autenticar
        setShowRegisterModal(false);
        setShowLoginModal(false);
        
        // Opcional: Mostrar mensaje de éxito
       // alert(`Usuario ${userData.username} registrado correctamente. Por favor inicia sesión.`);
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (

        <div className="auth-corner">

        {user ? (
            <div className="user-corner-info">
                <span>Bienvenido, {user.name || user.email}</span>
                <button className="logout-corner" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        ) : (
            <button 
                className="login-corner" 
                onClick={() => setShowLoginModal(true)}
            >
                Iniciar sesión
            </button>
        )}


            {/* Modales de autenticación */}
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