import UiStateProvider from "@/contexts/UiState.context";
import React from "react";
import RightBottomUI from "./_components/RightBottomUI";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <UiStateProvider>
            {children}
            <RightBottomUI />
        </UiStateProvider>
    );
}

export default MainLayout;
