"use client";

import { createContext, PropsWithChildren, useState } from "react";

export type UiStateContextType = {
    mainReady: boolean;
    setMainReady: (ready: boolean) => void;
};

const initialState: UiStateContextType = {
    mainReady: false,
    setMainReady: () => {},
};

export const UiStateContext = createContext<UiStateContextType>(initialState);

export function UiStateProvider({ children }: PropsWithChildren) {
    const [mainReady, setMainReady] = useState(false);

    const value = {
        mainReady,
        setMainReady,
    };

    return <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>;
}
