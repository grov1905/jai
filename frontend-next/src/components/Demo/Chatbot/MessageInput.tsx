// components/MessageInput.tsx
import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  style: any;
  channel: string;
}

export default function MessageInput({ onSend, style, channel }: Props) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div 
      className="p-3 flex items-center"
      style={{ 
        backgroundColor: style.inputBg,
        paddingLeft: channel === 'whatsapp' ? '8px' : '12px', // Ajuste para WhatsApp
        paddingRight: channel === 'whatsapp' ? '8px' : '12px' // Ajuste para WhatsApp
      }}
    >
      {/* Iconos izquierdos (micrófono y clip) */}
      <div className="flex space-x-1">
        {channel === 'whatsapp' && (
          <>
            <button className="p-2 text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3S9 4.343 9 6v6c0 1.657 1.343 3 3 3z"/>
                <path d="M17 12c0 2.761-2.239 5-5 5s-5-2.239-5-5H5c0 3.866 3.134 7 7 7s7-3.134 7-7h-2z"/>
              </svg>
            </button>
            <button className="p-2 text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11H5c-.553 0-1-.447-1-1s.447-1 1-1h14c.553 0 1 .447 1 1s-.447 1-1 1zM19 7H5c-.553 0-1-.447-1-1s.447-1 1-1h14c.553 0 1 .447 1 1s-.447 1-1 1zM5 15h14c.553 0 1-.447 1-1s-.447-1-1-1H5c-.553 0-1 .447-1 1s.447 1 1 1zM5 19h14c.553 0 1-.447 1-1s-.447-1-1-1H5c-.553 0-1 .447-1 1s.447 1 1 1z"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Input de texto - Ajustamos márgenes */}
      <input
        className="flex-1 p-2 mx-2 rounded-full bg-white border-none outline-none text-sm"
        style={{
          marginLeft: channel === 'whatsapp' ? '4px' : '8px',
          marginRight: channel === 'whatsapp' ? '4px' : '8px'
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Escribe un mensaje..."
      />

      {/* Botón de enviar - Reducimos tamaño y ajustamos posición */}
      <button
        className="p-2 rounded-full flex-shrink-0"
        style={{ 
          backgroundColor: style.headerBg,
          transform: channel === 'whatsapp' ? 'scale(0.9)' : 'none'
        }}
        onClick={handleSend}
      >
        <svg 
          className="w-5 h-5 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          style={{
            transform: channel === 'whatsapp' ? 'translateX(1px)' : 'none' // Ajuste fino de posición
          }}
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  );
}