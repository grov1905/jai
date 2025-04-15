import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import HeaderButton from '../HeaderButton/HeaderButton';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import { motion } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blog');

  return (
    <header className="
      relative
      flex flex-col md:flex-row
      justify-between
      items-center
      w-full
      max-w-[1200px]
      py-4 px-4 md:py-2 md:px-6 lg:px-0
      mx-auto
      gap-4 md:gap-6
    ">
      {/* Primera fila: Logo + elementos desktop */}
      <div className="
        w-full
        flex flex-col md:flex-row
        justify-between
        items-center
        gap-4 md:gap-0
      ">
        {/* Logo - Centrado en móvil, alineado a la izquierda en desktop */}
        <div className="
          hover:scale-105 
          transition-transform 
          duration-200
          order-1 md:order-none
          w-full md:w-auto flex justify-center md:justify-start
        ">
          <Link href="/" aria-label="Inicio" passHref>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [-20, 0, -10, 0] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <Image
                src="/logo512.png"
                alt="JAI Logo"
                width={400}
                height={400}
                className="w-[180px] sm:w-[220px] md:w-[250px] lg:w-[600px]"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Elementos desktop (ocultos en móvil) */}
        <div className="hidden md:flex items-center gap-6">
          <Navbar /> {/* Navbar horizontal para desktop */}
          <div className="flex items-center gap-4">
            <Login />
           <HeaderButton />
          </div>
        </div>
      </div>

      {/* Segunda fila: Navbar móvil (solo visible en móvil) */}
      <div className="w-full md:w-auto order-3 md:order-none md:hidden">
        <Navbar  /> {/* Versión móvil con menú hamburguesa */}
      </div>

      {/* Tercera fila: Botones móvil (solo visible en móvil) */}
      <div className="
        md:hidden
        w-full
        flex justify-between
        items-center
        gap-4
        order-2
      ">
        <Login  />
        <HeaderButton  />
      </div>
    </header>
  );
}