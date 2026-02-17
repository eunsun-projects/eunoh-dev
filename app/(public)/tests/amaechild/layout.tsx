import type { Metadata } from "next";
import Script from "next/script";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";

export const metadata: Metadata = {
	title: "애매한이날",
	description: "애매한이날",
};

export default function AmaeChildLayout({ children }: PropsWithChildren) {
	return (
		<>
			<section className="absolute top-0 left-0 z-50 flex min-h-svh w-svw flex-col items-center justify-start bg-gradient-to-b from-purple-100 to-blue-200">
				<Back className="absolute top-1 right-1" iconClassName="text-white" />
				{children}
			</section>
			<Script
				src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
				integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
				crossOrigin="anonymous"
				strategy="afterInteractive"
			/>
		</>
	);
}
