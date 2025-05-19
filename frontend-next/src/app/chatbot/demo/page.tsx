// pages/demo/page.tsx
"use client"; 
import React from 'react';
import ChatBox from '@/components/Demo/Chatbot/ChatBox';

export default function MulticanalDemoPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 h-screen">
      <ChatBox
        channel="whatsapp"
        externalId="999999999"
        title="WhatsApp"
        color="#25D366"
        icon="🟢"
      />
      <ChatBox
        channel="facebook"
        externalId="psid_123456"
        title="Messenger"
        color="#0084ff"
        icon="📘"
      />
      <ChatBox
        channel="instagram"
        externalId="ig_abcdef"
        title="Instagram DM"
        color="#e1306c"
        icon="📸"
      />
      <ChatBox
        channel="telegram"
        externalId="chat_78910"
        title="Telegram"
        color="#0088cc"
        icon="✈️"
      />
    </div>
  );
}
