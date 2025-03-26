import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginModal from '../../components/LoginModal/LoginModal';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import CallToAction from '../../components/CallToAction/CallToAction';
import './HomePage.css';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLogin = (email, password) => {
        console.log("Email:", email, "Password:", password);
        setIsLoggedIn(true);
    };

    return (
        <div className="home-page">
            {/* Encabezado */}
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setShowLoginModal={setShowLoginModal}
            />

            {/* Modal de Inicio de Sesión */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}

            {/* Sección Hero */}
            <section className="hero">
                <h1>Innovación y Tecnología para el Futuro de tu Empresa</h1>
                <p>Soluciones innovadoras en tecnología e inteligencia artificial.</p>
                <button className="discover-button">Descubre nuestros servicios</button>
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
                    <ServiceCard icon="💻" title="Consultoría en Transformación Digital" description="Ayudamos a las empresas a adaptarse a la era digital." />
                    <ServiceCard icon="🛠️" title="Desarrollo de Software" description="Soluciones personalizadas para tus necesidades tecnológicas." />
                    <ServiceCard icon="🤖" title="Implementación de IA" description="Inteligencia artificial para optimizar tus procesos." />
                </div>
            </section>

            {/* Llamado a la Acción */}
            <CallToAction />

            {/* Pie de Página */}
            <Footer />
        </div>
    );
};

export default HomePage;