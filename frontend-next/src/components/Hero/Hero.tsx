import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-light to-[#B0C4DE] p-12 rounded-xl w-full max-w-[1000px] text-center mt-5">
      <h1 className="text-primary text-[40px] mb-3 font-semibold leading-[1.3]">Innovación y Tecnología para el Futuro de tu Empresa</h1>
      <p className="text-primary text-xl mb-9">Soluciones innovadoras en tecnología y transformación digital.</p>
      <Link href="/services" className="inline-block no-underline">
        <button className="bg-[#1e2a47] text-white border-none px-8 py-3 rounded font-bold cursor-pointer transition-colors hover:bg-[#304D80] text-[16px]">
          Descubre nuestros servicios
        </button>
      </Link>
    </section>  
  );
}

