import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginModal from '../../components/LoginModal/LoginModal';
import CallToAction from '../../components/CallToAction/CallToAction';
import AboutContent from "../../components/AboutContent/AboutContent";
import ServicesContent from '../../components/ServicesContent/ServicesContent';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLogin = (email, password) => {
        console.log("Email:", email, "Password:", password);
        setIsLoggedIn(true);
    };
    const handleAboutClick = async () => {

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
                <p>Soluciones innovadoras en tecnología y transformación digital.</p>
                <Link to="/servicios" className="discover-button-link">

                <button className="discover-button">
                    Descubre nuestros servicios                   
                </button>
                </Link>
            </section>

            {/* Sección Sobre JAI */}
            <AboutContent />

            {/* Sección de Servicios */}
{/*             <section className="services">
                <h2>Nuestros Servicios</h2>
                <div className="service-list">
                    <ServiceCard icon="💻" title="Consultoría en Transformación Digital" description="Ayudamos a las empresas a adaptarse a la era digital." />
                    <ServiceCard icon="🛠️" title="Desarrollo de Software" description="Soluciones personalizadas para tus necesidades tecnológicas." />
                    <ServiceCard icon="🤖" title="Automatización de Procesos" description="Mejora tus operaciones mediante la automatización inteligente." />
                </div>
            </section> */}
            <ServicesContent/>
            {/* Llamado a la Acción */}
            <CallToAction />

            {/* Pie de Página */}
            <Footer />
        </div>
    );
};

export default HomePage;