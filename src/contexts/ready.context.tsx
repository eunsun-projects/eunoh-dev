'use client';

import { createContext, PropsWithChildren, useState } from 'react';

export type UiStateContextType = {
  isMainReady: boolean;
  setIsMainReady: (ready: boolean) => void;
};

const initialState: UiStateContextType = {
  isMainReady: false,
  setIsMainReady: () => {},
};

export const UiStateContext = createContext<UiStateContextType>(initialState);

export function UiStateProvider({ children }: PropsWithChildren) {
  const [isMainReady, setIsMainReady] = useState(false);

  const value = {
    isMainReady,
    setIsMainReady,
  };

  return <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>;
}
