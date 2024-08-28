import { useUserQuery } from "@/hooks/queries/auth/useUserQuery";
import { User } from "@/types/user.types";
import { createContext, useEffect, useState } from "react";

export type AuthContextType = {
    user: User | null;
    isPending: boolean;
};

const initialValue: AuthContextType = {
    user: null,
    isPending: false,
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isPending, setIsPending] = useState<boolean>(false);

    const { data: user, isPending: isUserPending, error } = useUserQuery();

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

    const value = {
        user: user ?? null,
        isPending,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
