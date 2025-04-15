export default function AboutContent() {
    return (
      <section className="mt-5 text-center w-full max-w-2xl">
        <h2 className="text-primary text-3xl mb-5">Sobre JAI</h2>
        <p className="text-primary/80 text-lg mb-7">
          JAI es una empresa líder en soluciones tecnológicas e innovación. Nuestra misión es transformar
          el futuro de las empresas mediante la implementación de tecnologías avanzadas.
        </p>
        <div className="flex justify-around gap-5">
          <div className="bg-white p-5 rounded-lg shadow-md flex-1">
            <h3 className="text-primary text-2xl mb-2">Misión</h3>
            <p className="text-primary/80">Impulsar la transformación digital de nuestros clientes.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md flex-1">
            <h3 className="text-primary text-2xl mb-2">Visión</h3>
            <p className="text-primary/80">Ser referentes en innovación y tecnología a nivel global.</p>
          </div>
        </div>
      </section>
    );
  }