// hooks/useChatSocket.ts
import { useEffect, useRef, useState } from 'react';

export default function useChatSocket(channel: string, externalId: string) {
  const [latestMessage, setLatestMessage] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_URL_WEBSOCKET}/ws/chat`);
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.content) setLatestMessage(data.content);
      } catch (err) {
        console.error('Error parsing message', err);
      }
    };
    return () => ws.current?.close();
  }, [channel, externalId]);

  const sendMessage = (content: string) => {
    if (ws.current?.readyState === 1) {
      const payload = {
        channel,
        external_id: externalId,
        business_id: '0531ba25-e2d2-4d94-98f3-8e4d6126a229',
        content,
        metadata: { source: 'multicanal-demo' }
      };
      ws.current.send(JSON.stringify(payload));
    }
  };
  return { sendMessage, latestMessage };
}