export default function HeaderButton() {
  const whatsappNumber = "51935938821";
  const defaultMessage = "Hola somos JAI Experts. Un asesor se pondrá en contacto contigo en breve. Mientras tanto, ¿en qué podemos ayudarte?";

  const handleWhatsAppClick = async () => {
    try {
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
    <button 
      onClick={handleWhatsAppClick} 
      className="
        bg-primary text-white 
        border-none 
        px-6 py-2
        rounded-lg
        font-bold 
        cursor-pointer 
        transition-all
        duration-200
        hover:bg-[#304D80]
        text-sm sm:text-base
        whitespace-nowrap
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        w-full
      "
      aria-label="Contactar por WhatsApp"
    >
      Solicitar una consulta
    </button>
  );
}