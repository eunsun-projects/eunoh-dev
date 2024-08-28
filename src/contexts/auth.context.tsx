"use client";

import { getLogInWithProvider } from "@/apis/auth/client";
import { deleteLogOut } from "@/apis/auth/client/delete.logout";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { useUserQuery } from "@/hooks/queries/auth";
import { User } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";

export type AuthContextType = {
    user: User | null;
    isPending: boolean;
    loginWithProvider: (provider: string) => void;
    logOut: () => void;
};

const initialValue: AuthContextType = {
    user: null,
    isPending: false,
    loginWithProvider: () => {},
    logOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthProvider({ children }: PropsWithChildren) {
    const [isPending, setIsPending] = useState<boolean>(false);

    const { data: user, isPending: isUserPending, error } = useUserQuery();

    const queryClient = useQueryClient();

    const router = useRouter();

    const loginWithProvider: AuthContextType["loginWithProvider"] = useCallback(
        async (provider) => {
            try {
                const data = await getLogInWithProvider(provider);

                if (!data.url) console.error("로그인 실패, redirect url 없음");

                if (data.url) router.push(data.url);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                console.error(errorMessage);
            }
        },
        [router]
    );

    const logOut: AuthContextType["logOut"] = useCallback(async () => {
        if (!user) return alert("로그인하고 눌러주세요");

        try {
            await deleteLogOut();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return alert(errorMessage);
        }
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
    }, [user, queryClient]);

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
        console.log("user ======>", user);
    }, [user]);

    const value = {
        user: user ?? null,
        isPending,
        loginWithProvider,
        logOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
