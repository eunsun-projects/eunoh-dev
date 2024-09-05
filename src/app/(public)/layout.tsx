import { UiStateProvider } from "@/contexts/ready.context";
import React from "react";
import DarkLightModeButton from "./_components/ui/DarkLightModeButton";
import InitialSetDarkMode from "./_components/ui/InitialSetDarkMode";
import Links from "./_components/ui/Links";
import RightBottomUI from "./_components/ui/RightBottomUI";

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
