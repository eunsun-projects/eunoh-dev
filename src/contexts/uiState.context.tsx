"use client";

import { createContext, useState } from "react";

export type UiStateContextType = {
    mainReady: boolean;
    setMainReady: (ready: boolean) => void;
};

const initialState = {
    mainReady: false,
    setMainReady: () => {},
};

export const UiStateContext = createContext<UiStateContextType>(initialState);

function UiStateProvider({ children }: { children: React.ReactNode }) {
    const [mainReady, setMainReady] = useState(false);

    return (
        <UiStateContext.Provider value={{ mainReady, setMainReady }}>{children}</UiStateContext.Provider>
    );
}

export default UiStateProvider;
