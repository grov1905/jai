import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <h3>Contacto</h3>
                    <p><a href="mailto:contacto@jaiexperts.com">Email: contacto@jaiexperts.com</a></p>
                    <p>Teléfono: +51 977205812</p>
                </div>
                <div className="social-media">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <p className="copyright">&copy; 2023 JAI. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;