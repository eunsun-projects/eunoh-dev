import UiStateProvider from "@/contexts/UiState.context";
import React from "react";
import InitialSetDarkMode from "./_components/InitialSetDarkMode";
import RightBottomUI from "./_components/RightBottomUI";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <UiStateProvider>
            <InitialSetDarkMode />
            {children}
            <RightBottomUI />
        </UiStateProvider>
    );
}

export default MainLayout;
