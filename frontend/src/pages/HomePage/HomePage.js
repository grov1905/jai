import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import LoginModal from '../../components/LoginModal/LoginModal';
import Hero from '../../components/Hero/Hero'
import AboutContent from "../../components/AboutContent/AboutContent";
import ServicesContent from '../../components/ServicesContent/ServicesContent';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';

import './HomePage.css';


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
            <Hero />
            {/* Sección Sobre JAI */}
            <AboutContent />
            {/* Nuestros Servicios JAI */}
            <ServicesContent/>
            {/* Llamado a la Acción */}
            <CallToAction />
            {/* Pie de Página */}
            <Footer />

        </div>
    );
};

export default HomePage;