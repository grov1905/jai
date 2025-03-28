import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="contact-container">
        <h1>Contáctanos</h1>
        <p>Déjanos un mensaje y te responderemos lo antes posible.</p>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
