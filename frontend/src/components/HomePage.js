import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal'; // Importar el modal de inicio de sesión
import './HomePage.css';
import logo from '../assets/logo.png';

const HomePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
    const [showLoginModal, setShowLoginModal] = useState(false); // Estado del modal

    const handleLogin = (email, password) => {
        // Aquí puedes agregar la lógica de autenticación (por ejemplo, Firebase o un backend)
        console.log("Email:", email, "Password:", password);
        setIsLoggedIn(true); // Simular inicio de sesión exitoso
    };

    return (
        <div className="home-page">
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

            {/* Sección Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Innovación y Tecnología para el Futuro de tu Empresa</h1>
                    <p>Soluciones innovadoras en tecnología e inteligencia artificial.</p>
                    <button className="discover-button">Descubre nuestros servicios</button>
                </div>
            </section>

            {/* Sección Sobre JAI */}
            <section className="about">
                <h2>Sobre JAI</h2>
                <p>
                    JAI es una empresa líder en soluciones tecnológicas e innovación. Nuestra misión es transformar
                    el futuro de las empresas mediante la implementación de tecnologías avanzadas.
                </p>
                <div className="mission-vision">
                    <div className="card">
                        <h3>Misión</h3>
                        <p>Impulsar la transformación digital de nuestros clientes.</p>
                    </div>
                    <div className="card">
                        <h3>Visión</h3>
                        <p>Ser referentes en innovación y tecnología a nivel global.</p>
                    </div>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section className="services">
                <h2>Nuestros Servicios</h2>
                <div className="service-list">
                    <div className="service-card">
                        <span>💻</span>
                        <h3>Consultoría en Transformación Digital</h3>
                        <p>Ayudamos a las empresas a adaptarse a la era digital.</p>
                    </div>
                    <div className="service-card">
                        <span>🛠️</span>
                        <h3>Desarrollo de Software</h3>
                        <p>Soluciones personalizadas para tus necesidades tecnológicas.</p>
                    </div>
                    <div className="service-card">
                        <span>🤖</span>
                        <h3>Implementación de IA</h3>
                        <p>Inteligencia artificial para optimizar tus procesos.</p>
                    </div>
                </div>
            </section>

            {/* Llamado a la Acción */}
            <section className="call-to-action">
                <h2>¿Listo para transformar tu empresa?</h2>
                <p>Contáctanos hoy mismo y descubre cómo podemos ayudarte.</p>
                <button className="cta-button">Solicitar una consulta</button>
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
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i> {/* Ícono de Facebook */}
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i> {/* Ícono de Twitter */}
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i> {/* Ícono de LinkedIn */}
                            </a>
                        </div>
                    </div>
                </div>
                <p className="copyright">&copy; 2023 JAI. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;