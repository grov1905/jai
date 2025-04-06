import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (

        <nav className="navbar">
            <Link to="/">Inicio</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/about">Sobre Nosotros</Link>
             <Link to="/blog">Blog</Link> 
            <Link to="/contact">Contacto</Link>
        </nav>

    );
};

export default Navbar;