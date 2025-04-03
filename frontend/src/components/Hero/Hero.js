import React from "react";
import "./Hero.css";
import { Link } from 'react-router-dom';

const Hero = () => {
    return (

        <section className="hero">
            <h1>Innovación y Tecnología para el Futuro de tu Empresa</h1>
            <p>Soluciones innovadoras en tecnología y transformación digital.</p>
            <Link to="/servicios" className="discover-button-link">

                <button className="discover-button">
                    Descubre nuestros servicios                   
                </button>
            </Link>
        </section>

);
};

export default Hero;
