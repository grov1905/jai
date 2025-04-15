import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", text: "Inicio" },
    { href: "/services", text: "Servicios" },
    { href: "/about", text: "Sobre Nosotros" },
    { href: "/pages/blog", text: "Blog" },
    { href: "/contact", text: "Contacto" }
  ];

  return (
    <>
      {/* Navbar para desktop (hidden en mobile) */}
      <nav className="hidden md:flex gap-4 lg:gap-6">
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="
              no-underline font-medium md:font-bold
              text-[#304D80] hover:text-primary
              text-base
              whitespace-nowrap
              transition-colors duration-200
              px-3 py-2 rounded
             
            "
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* Mobile menu button (hidden on desktop) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            text-[#304D80] hover:text-primary
            focus:outline-none
            p-2
          "
          aria-label="Menú de navegación"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu (hidden on desktop) */}
      {isOpen && (
        <div className="
          md:hidden
          absolute top-20 left-0 right-0
          bg-white
          shadow-lg
          z-50
          px-4 py-2
        ">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="
                  no-underline font-medium
                  text-[#304D80] hover:text-primary
                  text-base
                  whitespace-nowrap
                  transition-colors duration-200
                  px-3 py-2 rounded
                 
                  block
                "
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}