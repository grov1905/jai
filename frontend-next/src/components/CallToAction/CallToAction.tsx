export default function CallToAction() {
    const whatsappNumber = "51935938821";
    const defaultMessage = "Hola somos JAI Experts. Un asesor se pondrá en contacto contigo en breve. Mientras tanto, ¿en qué podemos ayudarte?";
  
    const handleWhatsAppClick = async () => {
      try {
        // Aquí iría la llamada a la API para registrar el click
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`,
          "_blank"
        );
      } catch (error) {
        console.error("Error al registrar el contacto:", error);
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`,
          "_blank"
        );
      }
    };
  
    return (
      <section className="mt-[50px] text-center w-full bg-primary text-white p-10 rounded-xl py-10 px-5">
        <h2 className="text-white text-[32px] mb-3">¿Listo para transformar tu empresa?</h2>
        <p className="text-white text-[19.2px] mb-8">Contáctanos hoy mismo y descubre cómo podemos ayudarte.</p>
        <button 
          onClick={handleWhatsAppClick} 
          className="bg-[#304D80] text-white border-none px-8 py-3 rounded font-bold cursor-pointer transition-colors hover:bg-primary/90"
        >
          Solicitar una consulta
        </button>
      </section>
    );
  }