// src/components/ContactForm/ContactForm.tsx
'use client';

import { useContact } from '@/hooks/useContact';
import { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { sendContactForm, isLoading, error, isSuccess } = useContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sendContactForm(formData);
    
    if (success) {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (

<div className="text-center py-1 px-1 max-w-[800px] mx-auto">
  <h1 className="text-[32px] text-[#1e2a47]">Contáctanos</h1>
  <p className="text-[#1e2a47] text-[19.2px]">Déjanos un mensaje y te responderemos lo antes posible.</p>

  <div className="
    flex flex-col items-center justify-center
    p-5 bg-[#f9f9f9] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]
    max-w-[600px] mx-auto my-0
  ">
    <form 
      className="flex flex-col gap-4 w-full items-center" // Añadí items-center aquí
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={isLoading}
        className="
          w-[95%] p-3 border border-[#ccc] rounded
          text-base transition-colors duration-300 ease-in-out
          focus:border-[#304d80] focus:outline-none
          disabled:opacity-70
        "
      />
      
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isLoading}
        className="
          w-[95%] p-3 border border-[#ccc] rounded
          text-base transition-colors duration-300 ease-in-out
          focus:border-[#304d80] focus:outline-none
          disabled:opacity-70
        "
      />
      
      <textarea
        name="message"
        placeholder="Escribe tu mensaje"
        value={formData.message}
        onChange={handleChange}
        required
        rows={4}
        disabled={isLoading}
        className="
          w-[95%] p-3 border border-[#ccc] rounded
          text-base transition-colors duration-300 ease-in-out
          focus:border-[#304d80] focus:outline-none
          h-20 resize-y disabled:opacity-70
        "
      />
      
      <button 
        type="submit"
        disabled={isLoading}
        className="
          w-[95%] p-3 bg-[#1e2a47] text-white // Mismo 95% que los inputs
          border-none rounded text-base
          transition-colors duration-300
          hover:bg-[#304d80] disabled:opacity-70 disabled:cursor-not-allowed   
        "
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
    
    {isSuccess && (
      <div className="
        w-[95%] mt-4 p-3 rounded border
        text-center font-bold
        bg-[#d4edda] text-[#155724] border-[#c3e6cb]
      ">
        Mensaje enviado con éxito
      </div>
    )}
    
    {error && (
      <div className="
        w-[95%] mt-4 p-3 rounded border
        text-center font-bold
        bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]
      ">
        {error.message}
      </div>
    )}
  </div>
</div>
  );
};