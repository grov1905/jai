import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/servicios" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;


/*                <Route path="/sobre-nosotros" element={<AboutPage />} />
                <Route path="/contacto" element={<ContactPage />} /> */