import React, { useRef, useEffect, useState } from 'react';
import { RefContext } from './RefContext';

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket("wss://sockettalk-2mkq.onrender.com");
    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <RefContext.Provider value={{ ws, connected }}>
      {children}
    </RefContext.Provider>
  );
};