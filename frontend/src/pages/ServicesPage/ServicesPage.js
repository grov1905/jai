import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginModal from '../../components/LoginModal/LoginModal';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import CallToAction from '../../components/CallToAction/CallToAction';
import './ServicesPage.css';

const ServicesPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLogin = (email, password) => {
        console.log("Email:", email, "Password:", password);
        setIsLoggedIn(true);
    };

    return (
        <div className="services-page">
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setShowLoginModal={setShowLoginModal}
            />
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}
            {/* Contenido de la página */}
            <section className="services-section">
                <h1>Nuestros Servicios Tecnológicos</h1>
                <p className="services-description">
                    Ofrecemos soluciones innovadoras para impulsar la transformación digital de tu empresa.
                </p>
                <div className="services-list">
                    <ServiceCard icon="💻" title="Consultoría Tecnológica" description="Ayudamos a las empresas a adoptar tecnologías avanzadas y mejorar sus procesos." />
                    <ServiceCard icon="🛠️" title="Desarrollo de Software" description="Creación de soluciones personalizadas para tus necesidades tecnológicas." />
                    <ServiceCard icon="🤖" title="Automatización de Procesos" description="Optimizamos tus operaciones mediante la automatización inteligente." />
                </div>
            </section>
            <CallToAction />
            <Footer />
        </div>
    );
};

export default ServicesPage;