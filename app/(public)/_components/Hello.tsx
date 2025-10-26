"use client";

import { ReactTyped } from "react-typed";
import { useReadyState } from "@/hooks/ui/useReadyState";
import { useIsMobile } from "@/hooks/use-mobile";
import { DarkLightModeButton, Links, Nav } from "./ui";

function Hello() {
	const { isMainReady, setIsMainReady } = useReadyState();
	const isMobile = useIsMobile();

	return (
		<section className="flex flex-col">
			<div className="flex flex-col gap-9">
				<div className="flex flex-row items-center justify-between gap-2">
					<h1 className="font-bold text-neutral-900 dark:text-neutral-50">
						<ReactTyped strings={["오은: FE engineer"]} typeSpeed={10} />
					</h1>
					<DarkLightModeButton ready={isMainReady} />
				</div>
				<div className="flex min-h-[96px] flex-col gap-2 whitespace-pre-wrap text-balance break-keep text-xs xl:min-h-fit xl:text-sm">
					<p>
						<ReactTyped
							strings={[
								isMobile
									? "사용자의 경험을 세심하게 다듬고,\n탐구와 기록을 이어가며 성장합니다."
									: "사용자의 경험을 세심하게 다듬고, 탐구와 기록을 이어가며 성장합니다.",
							]}
							typeSpeed={10}
							className="whitespace-pre-wrap text-balance break-keep"
						/>
					</p>
					<p>
						<ReactTyped
							strings={[
								isMobile
									? "팀의 동기부여를 이끌며 협업 속에서\n만들어지는 성과에 열정을 가지고 있습니다."
									: "팀의 동기부여를 이끌며 협업 속에서 만들어지는 성과에 열정을 가지고 있습니다.",
							]}
							typeSpeed={9}
							onComplete={() => setIsMainReady(true)}
							className="whitespace-pre-wrap text-balance break-keep"
						/>
					</p>
					<p>
						<ReactTyped
							strings={["정말 해결해야 하는 것이 무엇인지 항상 고민합니다."]}
							typeSpeed={10}
							className="whitespace-pre-wrap text-balance break-keep"
						/>
					</p>
				</div>
				<Links ready={isMainReady} />
				<Nav ready={isMainReady} />
			</div>
		</section>
	);
}

export default Hello;
