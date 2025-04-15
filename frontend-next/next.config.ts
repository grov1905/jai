/* import type { NextConfig } from "next";

const nextConfig: NextConfig = { */
  /* config options here */
/* };

export default nextConfig;
 */

import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com', // Dominio de ejemplo del error
      'tu-dominio-real.com', // Reemplaza con el dominio real de tus avatares
      'localhost', // Para desarrollo local
      'res.cloudinary.com', // Si usas Cloudinary
      'lh3.googleusercontent.com' // Si usas avatares de Google
    ],
  },
};

export default config;