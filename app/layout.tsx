import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import { d2coding } from "../src/fonts/fonts";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "EunOh's Portfolio",
	description: "EunOh's Dev Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className="dark">
			<body
				className={`${d2coding.className} bg-neutral-50 p-2 text-neutral-600 xl:p-0 dark:bg-neutral-900 dark:text-neutral-400`}
			>
				<QueryProvider>{children}</QueryProvider>
				<Analytics />
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
