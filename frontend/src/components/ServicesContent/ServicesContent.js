import React from "react";
import "./ServicesContent.css";
import ServiceCard from '../../components/ServiceCard/ServiceCard';

const ServicesContent = () => {
  return (


    <section className="services-section">
            <h1>Nuestros Servicios</h1>
            <p className="services-description">
        Ofrecemos soluciones innovadoras para impulsar la transformación digital de tu empresa.
        </p>
        <div className="services-list">
            <ServiceCard icon="💻" title="Consultoría en Transformación Digital" description="Impulsamos la evolución de tu empresa mediante la innovación tecnológica, 
            Ayudamos a las empresas a adaptarse a la era digital." />
            <ServiceCard icon="🛠️" title="Desarrollo de Software" description="Creación de soluciones personalizadas para tus necesidades tecnológicas." />
            <ServiceCard icon="🤖" title="Automatización de Procesos" description="Optimizamos tus operaciones mediante la automatización inteligente." />
            </div>
    </section>



  );
};

export default ServicesContent;