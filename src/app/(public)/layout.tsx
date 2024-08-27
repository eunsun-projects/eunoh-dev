import UiStateProvider from "@/contexts/UiState.context";
import React from "react";
import DarkLightModeButton from "./_components/DarkLightModeButton";
import InitialSetDarkMode from "./_components/InitialSetDarkMode";
import Links from "./_components/Links";
import RightBottomUI from "./_components/RightBottomUI";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <UiStateProvider>
            <InitialSetDarkMode />
            <DarkLightModeButton />
            <Links />
            {children}
            <RightBottomUI />
        </UiStateProvider>
    );
}

export default MainLayout;
