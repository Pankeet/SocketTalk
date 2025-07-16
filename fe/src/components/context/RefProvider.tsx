import React, { useRef } from 'react';
import { RefContext } from './RefContext';

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket | null>(null);

  return (
    <RefContext.Provider value={{ ws }}>
      {children}
    </RefContext.Provider>
  );
};
