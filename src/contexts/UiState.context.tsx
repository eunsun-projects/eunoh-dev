"use client";

import { UiStateContextType } from "@/types/ui.types";
import { createContext, useContext, useState } from "react";

const initialState = {
    mainReady: false,
    setMainReady: () => {},
};

const UiStateContext = createContext<UiStateContextType>(initialState);

export const useUiStateContext = () => useContext(UiStateContext);

function UiStateProvider({ children }: { children: React.ReactNode }) {
    const [mainReady, setMainReady] = useState(false);

    return (
        <UiStateContext.Provider value={{ mainReady, setMainReady }}>
            {children}
        </UiStateContext.Provider>
    );
}

export default UiStateProvider;
