'use client';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {ContactForm} from "@/components/ContactForm/ContacForm";

export default function ChatbotLanding() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', empresa: '', mensaje: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado');
    // Aquí puedes conectar tu backend o servicio externo
  };

  return (
    <div className="bg-light-bg font-sans text-primary">
      <Head>
        <title>Chatbot IA para WhatsApp | JAI Experts</title>
        <meta name="description" content="Automatiza tu atención en WhatsApp con un chatbot inteligente. Responde 24/7, genera leads y ahorra tiempo." />
        <meta property="og:title" content="Chatbot IA para WhatsApp | JAI Experts" />
        <meta property="og:description" content="Automatiza tu atención al cliente con nuestro chatbot de inteligencia artificial para WhatsApp." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.jaiexperts.com/chatbot" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Chatbot para WhatsApp',
          description: 'Automatiza tu atención con un chatbot inteligente integrado a WhatsApp. Captura clientes, responde consultas y ahorra tiempo.',
          brand: { '@type': 'Brand', name: 'JAI Experts' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '25',
            availability: 'https://schema.org/InStock'
          }
        }) }} />
      </Head>

      {/* Hero */}
      <section className="px-4 py-16 text-center bg-primary text-white rounded-b-2xl">
        <div className="max-w-3xl mx-auto">
    
            <div>
            <Link href="/" aria-label="Inicio" passHref>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1  }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <Image
            src="/logo512.png"
            alt="JAI Logo"
            width={250}
            height={250}
            className="mx-auto mb-4 rounded-2xl bg-white p-2"
            priority
          />
            </motion.div>
          </Link>

            </div>

          <h1 className="text-4xl font-bold mb-4">Automatiza tu atención en WhatsApp con IA</h1>
          <p className="text-lg mb-6">Responde consultas, genera leads y ahorra tiempo 24/7 con nuestra solución inteligente para empresas.</p>
          <div className="flex justify-center gap-4">
            <a href="https://wa.me/51935938821" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-green-700 transition">Solicita una demo gratuita</a>
            <a href="#formulario" className="bg-white text-primary px-6 py-2 rounded-2xl shadow hover:bg-primary-light transition">Déjanos tus datos</a>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">¿Por qué elegir nuestro chatbot?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl shadow">
            <span className="text-4xl">🤖</span>
            <h3 className="text-xl font-semibold mt-2">Responde consultas frecuentes automáticamente</h3>
          </div>
          <div className="p-4 rounded-2xl shadow">
            <span className="text-4xl">📈</span>
            <h3 className="text-xl font-semibold mt-2">Capta nuevos clientes desde WhatsApp</h3>
          </div>
          <div className="p-4 rounded-2xl shadow">
            <span className="text-4xl">⚡</span>
            <h3 className="text-xl font-semibold mt-2">Reduce tu carga operativa</h3>
          </div>
        </div>
      </section>

      {/* Ideal para tu negocio */}
      <section className="py-16 bg-light-bg text-center">
        <h2 className="text-3xl font-bold mb-8">Ideal para tu negocio</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-xl">
          <div>🛒 Tiendas online</div>
          <div>⚖️ Asesorías legales</div>
          <div>🩺 Clínicas o consultorios</div>
          <div>🛠 Servicios técnicos</div>
          <div>💻 Agencias digitales</div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-light-bg text-center">
        <h2 className="text-3xl font-bold mb-8">¿Cómo funciona?</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {[
            "Tu cliente escribe al WhatsApp de tu empresa.",
            "El chatbot responde y filtra según necesidad.",
            "Si es complejo, lo derivamos contigo.",
            "La IA aprende con cada caso.",
            "¡Tú ganas tiempo, clientes y control!",
          ].map((step, i) => (
            <p key={i} className="border-l-4 border-primary pl-4 text-lg">
              <strong>Paso {i + 1}:</strong> {step}
            </p>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Planes disponibles</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-light-bg p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Plan Emprendedor</h3>
            <p className="text-secondary mb-2">Ideal para negocios que recién empiezan</p>
            <ul className="text-sm text-secondary mb-4 text-left list-disc list-inside">
              <li>Hasta 1,000 mensajes/mes</li>
              <li>1 flujo conversacional</li>
              <li>Entrenamiento básico</li>
              <li>Soporte vía WhatsApp</li>
            </ul>
            <p className="text-lg font-bold mb-4">Desde $25/mes</p>
          </div>
          <div className="bg-light-bg p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Plan Profesional</h3>
            <p className="text-secondary mb-2">Para empresas que buscan escalar</p>
            <ul className="text-sm text-secondary mb-4 text-left list-disc list-inside">
              <li>Hasta 10,000 mensajes/mes</li>
              <li>Flujos personalizados</li>
              <li>Entrenamiento continuo</li>
              <li>Dashboard de métricas</li>
            </ul>
            <p className="text-lg font-bold mb-4">Desde $59/mes</p>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="formulario" className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">¿Listo para tu chatbot con IA?</h2>
          <div className="max-w-2xl mx-auto text-left bg-light-bg p-8 rounded-2xl shadow">
          <ContactForm  />
          </div>
         
      </section>
    </div>
  );
}


  {/*  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left bg-light-bg p-8 rounded-2xl shadow">
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-2xl" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Correo</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-2xl" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Empresa</label>
            <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-2xl" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">¿En qué podemos ayudarte?</label>
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded-2xl" required></textarea>
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-2xl shadow hover:bg-primary-light transition">Enviar solicitud</button>
         </form>
         */}