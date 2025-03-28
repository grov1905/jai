import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AboutContent from "../../components/AboutContent/AboutContent";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <h1>Sobre Nosotros</h1>
        <AboutContent />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
