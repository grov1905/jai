import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
      <footer className="mt-12 w-full bg-primary text-white p-5 text-center">
        <div className="flex justify-around mb-5">
          <div className="contact-info">
            <h3 className="text-white text-lg mb-2">Contacto</h3>
            <p>
              <a href="mailto:contacto@jaiexperts.com" className="text-primary-light/80 hover:underline">
                Email: contacto@jaiexperts.com
              </a>
            </p>
            <p>Teléfono: +51 935938821</p>
          </div>
          <div className="social-media">
            <h3 className="text-white text-lg mb-2">Síguenos</h3>
            <div className="flex justify-center gap-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light/80 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light/80 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light/80 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-sm mt-5">&copy; 2023 JAI. Todos los derechos reservados.</p>
      </footer>
    );
}