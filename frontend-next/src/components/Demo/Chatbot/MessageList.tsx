// components/MessageList.tsx
import React, { useEffect, useRef } from 'react';

interface Message {
  from: 'user' | 'bot';
  content: string;
  time?: string;
}

interface Props {
  messages: Message[];
  style: any;
  channel: string;
}

export default function MessageList({ messages, style, channel }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-2"
      style={{ 
        backgroundColor: channel === 'whatsapp' ? '#e5ddd5' : 
                       channel === 'telegram' ? '#e6ebee' : 
                       channel === 'instagram' ? '#fafafa' : '#f0f2f5',
        backgroundImage: channel === 'whatsapp' ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' : 'none'
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`p-3 rounded-lg max-w-[80%] relative ${
              msg.from === 'user' 
                ? `rounded-tr-none ${style.bubbleUser}`
                : `rounded-tl-none ${style.bubbleBot}`
            }`}
          >
            {msg.content}
            <div 
              className={`text-xs mt-1 text-right ${msg.from === 'user' ? 'text-gray-500' : style.timeColor}`}
            >
              {msg.time}
            </div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}