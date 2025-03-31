import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
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

    const handleWhatsAppClick = async () => {
        const phoneNumber = "51977205812";
        const message = encodeURIComponent("Hola somos JAI Experts. Un asesor se pondrá en contacto contigo en breve. Mientras tanto, ¿en qué podemos ayudarte?");
        
        // `${process.env.REACT_APP_API_URL}/api/users/register/`
        // Notificar al backend que un usuario ha hecho clic
        await fetch(`${process.env.REACT_APP_API_URL}/api/contact/whatsapp/log/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone_number: phoneNumber, message: "Solicitud enviada" })
        });
    
        // Redirigir a WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <header className="header">
            {/* Estado de sesión en esquina superior derecha */}
{/*             <div className="auth-corner">
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
            </div> */}

            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="JAI Logo" className="logo" />
                </Link>
            </div>
            
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/servicios">Servicios</Link>
                <Link to="/about">Sobre Nosotros</Link>
                <Link to="/contact">Contacto</Link>
            </nav>
            
            <div className="header-buttons">
                <button  onClick={handleWhatsAppClick} className="primary-button">
                    Solicitar una consulta
                </button>
            </div>
            
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
        </header>
    );
};

export default Header;