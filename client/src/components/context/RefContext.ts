import React , { createContext } from 'react';

export type RefContextType = {
  ws: React.MutableRefObject<WebSocket | null>;
  connected : boolean
};

export const RefContext = createContext<RefContextType | null>(null);
