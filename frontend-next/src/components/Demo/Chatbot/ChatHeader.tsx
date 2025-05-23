
//frontend-next/src/components/Demo/Chatbot/ChatHeader.tsx
import React from 'react';

interface Props {
  title: string;
  color: string;
  icon?: string;
  style: any;
  channel: string;
}

export default function ChatHeader({ title, color, icon, style, channel }: Props) {
  return (
    <div 
      className="relative p-4 font-bold text-white flex items-center justify-between z-0"
      style={{ 
        background: style.headerBg,
        paddingTop: '2.5rem' // Para dejar espacio a la barra de notificaciones
      }}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span>{title}</span>
      </div>
      
      {/* Iconos específicos por plataforma */}
      <div className="flex items-center space-x-3">
        {channel === 'whatsapp' && (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"/>
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
            </svg>
          </>
        )}
        {channel === 'facebook' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3-7h2v6h2v-6h2v-2h-2V9h-2v2H9v2z"/>
          </svg>
        )}
        {channel === 'instagram' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 2c-2.644 0-2.957.01-4.004.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857C4.01 9.043 4 9.356 4 12c0 2.644.01 2.957.058 4.004.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.047.047 1.36.058 4.004.058 2.644 0 2.957-.01 4.004-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.047.058-1.36.058-4.004 0-2.644-.01-2.957-.058-4.004-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344C14.957 4.01 14.644 4 12 4zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
          </svg>
        )}
        {channel === 'telegram' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22.01-.32-.05-.1-.17-.14-.32-.05-.37.25-7.39 4.67-7.39 4.67-.35.2-.34.18-.33.56.02.17.23.65.33.84.24.38.84 1.15 1.26 1.48.46.38.82.57 1.25.73.5.19 1 .17 1.56.1.48-.07 4.28-1.74 4.88-5.24.28-1.66.42-5.13.15-5.71-.12-.27-.35-.43-.67-.43-.2 0-.4.04-.58.12z"/>
          </svg>
        )}
      </div>
    </div>
  );
}