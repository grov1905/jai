// hooks/useChatSocket.ts
import { useEffect, useRef, useState } from 'react';

export default function useChatSocket(channel: string, externalId: string) {
  const [latestMessage, setLatestMessage] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080/ws/chat');
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
        business_id: 'd652eaa8-dd23-42f2-9835-283eaa069be0',
        content,
        metadata: { source: 'multicanal-demo' }
      };
      ws.current.send(JSON.stringify(payload));
    }
  };
  return { sendMessage, latestMessage };
}