import ServiceCard from '../ServiceCard/ServiceCard';

export default function ServicesContent() {
  return (
    <section className="text-center w-full max-w-6xl mt-5">
      <h1 className="text-primary text-4xl mb-5">Nuestros Servicios</h1>
      <p className="text-primary/80 text-xl mb-10">
        Ofrecemos soluciones innovadoras para impulsar la transformación digital de tu empresa.
      </p>
      <div className="flex justify-around gap-5 flex-wrap">
        <ServiceCard 
          icon="💻" 
          title="Consultoría en Transformación Digital" 
          description="Impulsamos la evolución de tu empresa mediante la innovación tecnológica, Ayudamos a las empresas a adaptarse a la era digital." 
        />
        <ServiceCard 
          icon="🛠️" 
          title="Desarrollo de Software" 
          description="Creación de soluciones personalizadas para tus necesidades tecnológicas." 
        />
        <ServiceCard 
          icon="🤖" 
          title="Automatización de Procesos" 
          description="Optimizamos tus operaciones mediante la automatización inteligente." 
        />
      </div>
    </section>
  );
}