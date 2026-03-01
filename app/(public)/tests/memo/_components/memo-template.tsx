"use client";

import useMemoApp, { MemoAppProvider } from "../_hooks/use-memo-app";
import MemoArticle from "./memo-article";
import MemoAside from "./memo-aside";

function MemoTemplate() {
	const { isMobileMenuOpen, closeMobileMenu } = useMemoApp();

	return (
		<MemoAppProvider>
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-1010 block h-svh w-svw bg-black/50 sm:hidden"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							closeMobileMenu();
						}
					}}
					onClick={closeMobileMenu}
				/>
			)}
			<div className="relative m-0 mx-auto flex h-svh w-full max-w-full flex-row border border-[#E6E6E6] border-none bg-white shadow-none sm:h-[500px] sm:max-w-[1024px] sm:rounded-lg sm:shadow-2xl">
				<MemoAside />

				<MemoArticle />
			</div>
		</MemoAppProvider>
	);
}

export default MemoTemplate;
