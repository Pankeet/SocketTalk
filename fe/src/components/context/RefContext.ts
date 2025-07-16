import React , { createContext } from 'react';

export type RefContextType = {
  ws: React.MutableRefObject<WebSocket | null>;
};

export const RefContext = createContext<RefContextType | null>(null);
