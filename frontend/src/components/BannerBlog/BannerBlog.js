import React from "react";
import "./BannerBlog.css";
import { Link } from 'react-router-dom';

const BannerBlog = () => {
    return (


        <section className="BannerBlog">
            <h1>Innovación y Tecnología para el Futuro de tu Empresa</h1>
            <p>Soluciones innovadoras en tecnología y transformación digital.</p>
            <Link to="/servicios" className="discover-button-link">

              
            </Link>
        </section>

    );
};

export default BannerBlog;
