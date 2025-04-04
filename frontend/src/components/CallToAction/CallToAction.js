import React from 'react';
import './CallToAction.css';
import { ContactService } from '../../api/contact'; // Ajusta la ruta según tu estructura

const CallToAction = () => {

    const whatsappNumber = "51935938821";
    const defaultMessage = "Hola somos JAI Experts. Un asesor se pondrá en contacto contigo en breve. Mientras tanto, ¿en qué podemos ayudarte?";

    const handleWhatsAppClick = async () => {
        try {
        // 1. Registrar el click en el backend
        await ContactService.logWhatsAppClick(
            whatsappNumber,
            "Solicitud enviada desde botón header"
        );

        // 2. Redirigir a WhatsApp
        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`,
            "_blank"
        );

        } catch (error) {
            console.error("Error al registrar el contacto:", error);
      
        // Opciones de manejo de errores (elige la que prefieras):
      
        // a) Redirigir igualmente a WhatsApp (comportamiento actual)
        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`,
            "_blank"
        );
      
      // b) Mostrar notificación al usuario
      // alert("El sistema está ocupado. Serás redirigido a WhatsApp directamente.");
      
      // c) Lógica de reintento
      // if (error.includes("timeout")) { ... }
        }
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