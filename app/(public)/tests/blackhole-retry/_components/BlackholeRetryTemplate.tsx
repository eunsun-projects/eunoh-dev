"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiHuggingface } from "react-icons/si";
import { Back } from "@/app/(public)/_components/ui";
import { useIsMobileState } from "@/hooks/use-mobile";
import styles from "../_styles/blackhole-retry.module.css";
import BlackholeRetryCanvas from "./BlackholeRetryCanvas";
import Controls, { type BlackholeParams } from "./Controls";

const defaultParamsMobile: BlackholeParams = {
	mass: 0.4,
	intensity: 1.5,
	temperature: 0.5,
	speed: 1.0,
};

const defaultParams: BlackholeParams = {
	mass: 1.0,
	intensity: 1.5,
	temperature: 0.5,
	speed: 1.0,
};

function BlackholeRetryTemplate() {
	const isMobile = useIsMobileState();
	const [params, setParams] = useState<BlackholeParams | null>(null);

	useEffect(() => {
		if (isMobile === undefined) return;
		if (params) return;
		setParams(isMobile ? defaultParamsMobile : defaultParams);
	}, [isMobile, params]);

	const headerLink = useMemo(
		() => ({
			href: "https://huggingface.co/spaces/idgmatrix/anycoder-37d1a261",
			label: "Source (anycoder)",
		}),
		[],
	);

	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<div className="absolute top-4 right-4 z-[1001] flex items-center gap-2">
					<Link
						href={headerLink.href}
						target="_blank"
						className="flex items-center gap-2 text-white"
					>
						<SiHuggingface className="size-4" />
						<span>소스</span>
					</Link>
					<Back className="text-white" />
				</div>
			</header>
			{params && <BlackholeRetryCanvas params={params} />}

			{params && <Controls value={params} onChange={setParams} />}

			<div className={styles.instructions}>드래그하여 회전 / 휠로 줌</div>
		</div>
	);
}

export default BlackholeRetryTemplate;
