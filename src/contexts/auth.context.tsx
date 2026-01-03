"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { deleteLogOut, getLogInWithProvider } from "@/apis/auth/client";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { useUserQuery } from "@/hooks/queries/auth";
import type { User } from "@/types/user.types";

export type AuthContextType = {
	user: User | null;
	isPending: boolean;
	loginWithProvider: (provider: string, next?: string) => void;
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
	const pathname = usePathname();
	const [isPending, setIsPending] = useState<boolean>(false);

	const isQueryEnabled = useMemo(() => {
		const isAdminPage = pathname.startsWith("/admin/authed");
		const isUsageCalculatorPage = pathname.startsWith(
			"/tests/usage-calculator",
		);
		const isTimeCapsulePage = pathname.startsWith("/tests/timecapsule");
		const isFourPlayPage = pathname.startsWith("/fourplay");
		return (
			isAdminPage ||
			isUsageCalculatorPage ||
			isTimeCapsulePage ||
			isFourPlayPage
		);
	}, [pathname]);

	const {
		data: user,
		isPending: isUserPending,
		error,
	} = useUserQuery({
		enabled: isQueryEnabled,
	});

	const queryClient = useQueryClient();

	const router = useRouter();

	const loginWithProvider: AuthContextType["loginWithProvider"] = useCallback(
		async (provider: string, next = "/admin/authed") => {
			try {
				const data = await getLogInWithProvider(provider, next);

				if (!data.url) console.error("로그인 실패, redirect url 없음");

				if (data.url) router.push(data.url);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error";
				console.error(errorMessage);
			}
		},
		[router],
	);

	const logOut: AuthContextType["logOut"] = useCallback(async () => {
		if (!user) return alert("로그인하고 눌러주세요");

		try {
			await deleteLogOut();
			router.push("/admin");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error";
			return alert(errorMessage);
		}
		queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
	}, [user, queryClient, router]);

	useEffect(() => {
		if (isUserPending) {
			setIsPending(true);
		} else {
			setIsPending(false);
		}
	}, [isUserPending]);

	useEffect(() => {
		if (error) console.error(error);
		if (error?.message === "Cookie not found" && isQueryEnabled) {
			router.push("/admin");
		}
	}, [error, router, isQueryEnabled]);

	useEffect(() => {
		if (!isQueryEnabled) return;
		console.log("user ======>", user);
	}, [user, isQueryEnabled]);

	const value = {
		user: user ?? null,
		isPending,
		loginWithProvider,
		logOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
