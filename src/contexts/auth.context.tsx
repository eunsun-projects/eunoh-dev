"use client";

import { getLogInWithProvider } from "@/apis/auth/client";
import { useUserQuery } from "@/hooks/queries/auth";
import { User } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

export type AuthContextType = {
    user: User | null;
    isPending: boolean;
    loginWithProvider: (provider: string) => void;
};

const initialValue: AuthContextType = {
    user: null,
    isPending: false,
    loginWithProvider: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isPending, setIsPending] = useState<boolean>(false);

    const { data: user, isPending: isUserPending, error } = useUserQuery();

    const queryClient = useQueryClient();

    const loginWithProvider: AuthContextType["loginWithProvider"] = useCallback(async (provider) => {
        try {
            const data = await getLogInWithProvider(provider);
            // queryClient.invalidateQueries({
            //     queryKey: [QUERY_KEY_USER],
            // });

            if (!data.url) console.error("로그인 실패, redirect url 없음");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(errorMessage);
        }
    }, []);

    useEffect(() => {
        if (isUserPending) {
            setIsPending(true);
        }
    }, [isUserPending]);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const value = {
        user: user ?? null,
        isPending,
        loginWithProvider,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
