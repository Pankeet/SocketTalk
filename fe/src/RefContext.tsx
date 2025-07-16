import React, { createContext, useRef } from 'react';

type RefContextType = {
  ws: React.RefObject<WebSocket | null>;
};

export const RefContext = createContext<RefContextType | null>(null);

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket>(null);

  return (
    <RefContext.Provider value={{ ws }}>
      {children}
    </RefContext.Provider>
  );
};
