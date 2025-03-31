import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AboutContent from "../../components/AboutContent/AboutContent";
import CallToAction from '../../components/CallToAction/CallToAction';
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Header />
        <AboutContent />
      
        {/* Llamado a la Acción */}
        <CallToAction />
      <Footer />
    </div>
  );
};

export default AboutPage;
