import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginModal from '../../components/LoginModal/LoginModal';
import ServicesContent from '../../components/ServicesContent/ServicesContent';
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
            <ServicesContent/>
            <CallToAction />
            <Footer />
        </div>
    );
};

export default ServicesPage;