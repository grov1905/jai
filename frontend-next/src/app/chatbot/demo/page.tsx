// pages/demo/page.tsx
"use client";
import React, { useState } from 'react';
import ChatBox from '@/components/Demo/Chatbot/ChatBox';
import ChatConfigPanel from '@/components/Demo/Chatbot/ChatConfigPanel';

export default function MulticanalDemoPage() {
  const [config, setConfig] = useState({
    channel: 'whatsapp',
    externalId: '999999999',
    title: 'WhatsApp',
    color: '#25D366',
    icon: '🟢',
    businessId: '',
    businessChanged: false,
    businessName:''
  });

  // Resetear la bandera businessChanged después de usarla
  const handleConfigChange = (newConfig: any) => {
    setConfig(prev => ({
      ...newConfig,
      businessChanged: newConfig.businessId !== prev.businessId
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 h-screen">
      <ChatBox
        channel={config.channel}
        externalId={config.externalId}
        title={config.title}
        color={config.color}
        icon={config.icon}
        businessId={config.businessId}
        businessChanged={config.businessChanged}
        businessName={config.businessName}  // Nueva prop
      />
      <ChatConfigPanel 
        config={config} 
        setConfig={handleConfigChange} 
      />
    </div>
  );
}