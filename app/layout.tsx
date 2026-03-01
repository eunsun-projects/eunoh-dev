import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import { d2coding } from "../src/fonts/fonts";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
				<QueryProvider>
					<NuqsAdapter>{children}</NuqsAdapter>
				</QueryProvider>
				<Analytics />
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
