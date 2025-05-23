// frontend-next/src/components/Demo/Chatbot/ChatBox.tsx
"use client";
import React, { useEffect, useState } from 'react';
import useChatSocket from '@/hooks/useChatSocket';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatBoxProps {
    channel: string;
    externalId: string;
    title: string;
    color: string;
    icon?: string;
    businessId: string;
    businessChanged?: boolean;
    businessName?: string;  // Nueva prop para el nombre del negocio
  }

// Estilos específicos para cada plataforma
const PLATFORM_STYLES = {
  whatsapp: {
    headerBg: '#075E54',
    bubbleUser: '#DCF8C6',
    bubbleBot: '#FFFFFF',
    timeColor: '#667781',
    inputBg: '#F0F0F0',
  },
  facebook: {
    headerBg: '#0084FF',
    bubbleUser: '#E1F3FB',
    bubbleBot: '#F1F1F1',
    timeColor: '#65676B',
    inputBg: '#F0F2F5',
  },
  instagram: {
    headerBg: 'linear-gradient(to right, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040)',
    bubbleUser: '#DBDBDB',
    bubbleBot: '#FFFFFF',
    timeColor: '#8E8E8E',
    inputBg: '#F8F8F8',
  },
  telegram: {
    headerBg: '#0088CC',
    bubbleUser: '#E3F6FC',
    bubbleBot: '#FFFFFF',
    timeColor: '#999999',
    inputBg: '#F0F0F0',
  },
};

export default function ChatBox({ 
    channel, 
    externalId, 
    title, 
    color, 
    icon, 
    businessId, 
    businessChanged,
    businessName  // Nueva prop
  }: ChatBoxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; content: string; time?: string }[]>([]);
  const { sendMessage, latestMessage } = useChatSocket({ 
    channel, 
    externalId, 
    businessId 
  });

  // Efecto para marcar cuando el componente está montado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Formateador de hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Efecto para manejar cambio de negocio
  useEffect(() => {
    if (businessChanged && businessId && businessName) {  // Verificamos businessName
      // Limpiar el chat
      setMessages([]);
      
      // Enviar mensaje de bienvenida con el nombre del negocio
      const timeString = formatTime(new Date());
      setMessages([{ 
        from: 'bot', 
        content: `¡Bienvenido al chat de ${businessName}! ¿En qué podemos ayudarte hoy?`,
        time: timeString 
      }]);
    }
  }, [businessId, businessChanged, businessName]);  // Agregamos businessName a las dependencias

  // Efecto para nuevos mensajes del bot
  useEffect(() => {
    if (latestMessage) {
      const timeString = formatTime(new Date());
      setMessages((prev) => [...prev, { 
        from: 'bot', 
        content: latestMessage, 
        time: timeString 
      }]);
    }
  }, [latestMessage]);

  // Función para enviar mensajes
  const handleSend = (text: string) => {
    if (text.trim() && businessId) {
      const timeString = formatTime(new Date());
      sendMessage(text);
      setMessages((prev) => [...prev, { 
        from: 'user', 
        content: text, 
        time: timeString 
      }]);
    }
  };

  // Obtener estilos según la plataforma
  const currentStyle = PLATFORM_STYLES[channel as keyof typeof PLATFORM_STYLES] || PLATFORM_STYLES.whatsapp;

  // Mostrar advertencia si no hay negocio seleccionado
  if (!businessId) {
    return (
      <div className="relative mx-2 my-4 h-[90vh] max-h-[700px] w-full max-w-[300px] rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col border-8 border-black items-center justify-center p-4 text-center">
        <div className="text-red-500 font-bold mb-2">¡Atención!</div>
        <div className="text-sm">Por favor selecciona un negocio en el panel de configuración para habilitar el chat.</div>
      </div>
    );
  }

  return (
    <div className="relative mx-2 my-4 h-[90vh] max-h-[700px] w-full max-w-[300px] rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col border-8 border-black">
      {/* Barra de notificaciones del smartphone */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-between items-center px-4">
        <span className="text-white text-xs font-bold">
          {isMounted ? formatTime(new Date()) : '--:--'}
        </span>
        <div className="flex space-x-1">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9a7 7 0 1114 0A7 7 0 015 9zm7-5a5 5 0 00-5 5 1 1 0 11-2 0 7 7 0 0114 0 1 1 0 01-2 0 5 5 0 00-5-5z" clipRule="evenodd" />
          </svg>
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222a7 7 0 11-9.9-9.9 7 7 0 019.9 9.9zM12 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Componentes del chat */}
      <ChatHeader 
        title={title} 
        color={color} 
        icon={icon} 
        style={currentStyle} 
        channel={channel} 
      />

      <MessageList 
        messages={messages} 
        style={currentStyle} 
        channel={channel} 
      />

      <MessageInput 
        onSend={handleSend} 
        style={currentStyle} 
        channel={channel} 
      />

      {/* Indicador de navegación inferior */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="h-1 w-20 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}