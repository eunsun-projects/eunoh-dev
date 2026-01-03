"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getLogInWithProvider } from "@/apis/apis-auth-client";
import type { AuthContextType } from "@/contexts/auth.context";
import { useUserQuery } from "@/hooks/queries/auth";
import GoogleLoginButton from "./google-login-button";

function AdminLoginTemplate() {
	const router = useRouter();
	const {
		data: user,
		isPending: isUserPending,
		error,
	} = useUserQuery({
		enabled: true,
	});

	const loginWithProvider: AuthContextType["loginWithProvider"] = useCallback(
		async (provider: string, next = "/admin/authed") => {
			// console.log("loginWithProvider", provider);
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

	useEffect(() => {
		// console.log("user in admin login page ===>", user);
		if (user) router.push("/admin/authed");
	}, [user, router]);

	// useEffect(() => {
	//   if (!error) return;
	//   console.error("error in admin login page ===>", error);
	// }, [error]);

	if (isUserPending) return <div>Loading...</div>;
	if (error?.message === "Cookie not found")
		return (
			<GoogleLoginButton
				onClick={() => loginWithProvider("google", "/admin")}
			/>
		);

	return (
		<GoogleLoginButton onClick={() => loginWithProvider("google", "/admin")} />
	);
}

export default AdminLoginTemplate;
