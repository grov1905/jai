// hooks/useChatSocket.ts (modificado)
import { useEffect, useRef, useState } from 'react';

interface UseChatSocketProps {
  channel: string;
  externalId: string;
  businessId: string;
}

export default function useChatSocket({ channel, externalId, businessId }: UseChatSocketProps) {
  const [latestMessage, setLatestMessage] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    if (!businessId) return;

    ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_URL_WEBSOCKET}/ws/chat`);
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.content) setLatestMessage(data.content);
      } catch (err) {
        console.error('Error parsing message', err);
      }
    };
    
    return () => {
      if (ws.current?.readyState === 1) {
        ws.current.close();
      }
    };
  }, [channel, externalId, businessId]);

  const sendMessage = (content: string) => {
    if (ws.current?.readyState === 1 && businessId) {
      const payload = {
        channel,
        external_id: externalId,
        business_id: businessId,
        content,
        metadata: { source: 'multicanal-demo' }
      };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return { sendMessage, latestMessage };
}