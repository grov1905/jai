import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <header className="header">
            {/* Estado de sesión en esquina superior derecha */}
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
            </div>

            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="JAI Logo" className="logo" />
                </Link>
            </div>
            
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/servicios">Servicios</Link>
                <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                <Link to="/contacto">Contacto</Link>
            </nav>
            
            <div className="header-buttons">
                <button className="primary-button">
                    <Link to="/agendar-consulta">Agendar consulta</Link>
                </button>
            </div>
            
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}
        </header>
    );
};

export default Header;