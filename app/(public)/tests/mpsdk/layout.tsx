import Link from "next/link";
import type { PropsWithChildren } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

function MpSdkLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 h-auto min-h-dvh w-dvw bg-neutral-400">
			<Link
				href="/tests"
				className="absolute top-4 right-4 z-50 rounded-xl bg-neutral-600 p-1 text-white"
			>
				<RiArrowGoBackFill className="cursor-pointer text-lg" />
			</Link>
			{children}
		</section>
	);
}

export default MpSdkLayout;
