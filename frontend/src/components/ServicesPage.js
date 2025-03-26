import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal'; // Importar el modal de inicio de sesión
import './ServicesPage.css';
import logo from '../assets/logo.png';

const ServicesPage = () => {
        const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
        const [showLoginModal, setShowLoginModal] = useState(false); // Estado del modal
    
        const handleLogin = (email, password) => {
            // Aquí puedes agregar la lógica de autenticación (por ejemplo, Firebase o un backend)
            console.log("Email:", email, "Password:", password);
            setIsLoggedIn(true); // Simular inicio de sesión exitoso
        };
    return (
        <div className="services-page">
            {/* Encabezado */}
            <header className="header">
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
                {isLoggedIn ? (
                    <div className="user-info">
                        <span>Bienvenido, Usuario</span>
                        <button onClick={() => setIsLoggedIn(false)}>Cerrar sesión</button>
                    </div>
                ) : (
                    <button className="login-button" onClick={() => setShowLoginModal(true)}>
                        Iniciar sesión
                    </button>
                )}
            </header>
            {/* Mostrar el modal de inicio de sesión */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}

            {/* Sección de Servicios */}
            <section className="services-section">
                <h1>Nuestros Servicios Tecnológicos</h1>
                <p className="services-description">
                    Ofrecemos soluciones innovadoras para impulsar la transformación digital de tu empresa.
                </p>

                {/* Listado de Servicios */}
                <div className="services-list">
                    <div className="service-card">
                        <span>💻</span>
                        <h3>Consultoría Tecnológica</h3>
                        <p>Ayudamos a las empresas a adoptar tecnologías avanzadas y mejorar sus procesos.</p>
                    </div>
                    <div className="service-card">
                        <span>🛠️</span>
                        <h3>Desarrollo de Software</h3>
                        <p>Creación de soluciones personalizadas para tus necesidades tecnológicas.</p>
                    </div>
                    <div className="service-card">
                        <span>🤖</span>
                        <h3>Automatización de Procesos</h3>
                        <p>Optimizamos tus operaciones mediante la automatización inteligente.</p>
                    </div>
                    <div className="service-card">
                        <span>🔒</span>
                        <h3>Ciberseguridad</h3>
                        <p>Protegemos tus datos y sistemas con soluciones de seguridad avanzadas.</p>
                    </div>
                </div>
            </section>

            {/* Llamado a la Acción */}
            <section className="call-to-action">
                <h2>¿Necesitas una solución personalizada?</h2>
                <p>Contáctanos hoy mismo y descubre cómo podemos ayudarte.</p>
                <button className="cta-button">Solicitar una asesoría</button>
            </section>

            {/* Pie de Página */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="contact-info">
                        <h3>Contacto</h3>
                        <p>Email: info@jai.com</p>
                        <p>Teléfono: +123 456 789</p>
                    </div>
                    <div className="social-media">
                        <h3>Síguenos</h3>
                        <div className="social-icons">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <p className="copyright">&copy; 2023 JAI. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default ServicesPage;