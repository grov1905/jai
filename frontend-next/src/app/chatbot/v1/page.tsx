'use client';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatbotPlans(){

    return (
      <div className="bg-[#F5F5F5] min-h-screen text-[#1E2A47] font-sans">
        <header className="bg-white p-6 shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <Image
                        src="/logo512.png"
                        alt="JAI Logo"
                        width={250}
                        height={250}
                        className="mx-auto mb-4 rounded-2xl bg-white p-2"
                        priority
                      />
          {/*   <img src="/logo.png" alt="JAI Logo" className="h-12 mr-4" /> */}
            <h1 className="text-3xl font-bold">JAIExperts</h1>
          </div>
          <p className="italic text-sm">THINK. CREATE. EVOLVE.</p>
        </header>
  
        <main className="p-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Planes para Chatbot IA</h2>
  
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Base */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold mb-2">Plan Base</h3>
              <p className="text-lg mb-4">Funcional y rápido</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Flujo conversacional básico</li>
                <li>Hasta 10 FAQs predefinidas</li>
                <li>Similitud con MiniLM (sin OpenAI)</li>
                <li>Fallback simple</li>
                <li>Sin historial de conversaciones</li>
                <li>Soporte básico</li>
              </ul>
              <p className="mt-4 font-bold text-xl">USD 120</p>
            </div>
  
            {/* Plan Pro */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold mb-2">Plan Pro</h3>
              <p className="text-lg mb-4">Inteligente y contextual</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Todo lo del plan base</li>
                <li>Embeddings OpenAI más precisos</li>
                <li>GPT-3.5/GPT-4 para generar respuestas</li>
                <li>Historial por usuario</li>
                <li>Respuestas con base en historial</li>
                <li>Soporte técnico ampliado</li>
              </ul>
              <p className="mt-4 font-bold text-xl">USD 180 - 250</p>
            </div>
  
            {/* Plan Premium */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold mb-2">Plan Premium</h3>
              <p className="text-lg mb-4">Asistente virtual pro</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Todo lo del plan Pro</li>
                <li>Historial extendido</li>
                <li>RAG de documentos vectorizados</li>
                <li>Multi-turn conversation</li>
                <li>Entrenamiento supervisado</li>
                <li>Notificaciones por WhatsApp/Email</li>
              </ul>
              <p className="mt-4 font-bold text-xl">USD 300 - 400+</p>
            </div>
          </div>
  
          {/* Add-ons */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-4">Add-ons Opcionales</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-xl">
                <thead className="bg-[#1E2A47] text-white">
                  <tr>
                    <th className="text-left p-3">Add-on</th>
                    <th className="text-left p-3">Descripción</th>
                    <th className="text-left p-3">Precio</th>
                  </tr>
                </thead>
                <tbody className="text-[#1E2A47]">
                  <tr className="border-b">
                    <td className="p-3">Historial por usuario</td>
                    <td className="p-3">Guarda y reutiliza conversaciones</td>
                    <td className="p-3">USD 30</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Entrenamiento personalizado</td>
                    <td className="p-3">Adaptar FAQs y tono del bot</td>
                    <td className="p-3">USD 40</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Vectorización de documentos</td>
                    <td className="p-3">Permite búsquedas internas con IA</td>
                    <td className="p-3">USD 50</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">RAG avanzado</td>
                    <td className="p-3">Búsqueda precisa en documentos vectorizados</td>
                    <td className="p-3">USD 80 - 100</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Reconocimiento de voz</td>
                    <td className="p-3">Transcribe audios de clientes</td>
                    <td className="p-3">USD 50 - 100</td>
                  </tr>
                  <tr>
                    <td className="p-3">Búsqueda semántica de imágenes</td>
                    <td className="p-3">Para catálogos visuales con IA</td>
                    <td className="p-3">Desde USD 100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }
