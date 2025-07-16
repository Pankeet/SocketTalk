import { createContext } from 'react';
import type { RefObject } from 'react';

export type RefContextType = {
  ws: RefObject<WebSocket | null>;
};

export const RefContext = createContext<RefContextType | null>(null);
