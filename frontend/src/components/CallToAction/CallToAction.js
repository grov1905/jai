import React from 'react';
import './CallToAction.css';

const CallToAction = () => {

    const handleWhatsAppClick = async () => {
        const phoneNumber = "51977205812";
        const message = encodeURIComponent("Hola somos JAI Experts. Un asesor se pondrá en contacto contigo en breve. Mientras tanto, ¿en qué podemos ayudarte?");
        
        // `${process.env.REACT_APP_API_URL}/api/users/register/`
        // Notificar al backend que un usuario ha hecho clic
        await fetch(`${process.env.REACT_APP_API_URL}/api/contact/whatsapp/log/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone_number: phoneNumber, message: "Solicitud enviada" })
        });
    
        // Redirigir a WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <section className="call-to-action">
            <h2>¿Listo para transformar tu empresa?</h2>
            <p>Contáctanos hoy mismo y descubre cómo podemos ayudarte.</p>
            <button onClick={handleWhatsAppClick} className="cta-button">Solicitar una consulta</button>
        </section>
    );
};

export default CallToAction;