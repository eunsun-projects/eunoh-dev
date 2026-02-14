"use client";

import { useMemo, useState } from "react";

import styles from "../_styles/blackhole-retry.module.css";
import BlackholeRetryCanvas from "./BlackholeRetryCanvas";
import Controls, { type BlackholeParams } from "./Controls";

const defaultParams: BlackholeParams = {
	mass: 1.0,
	intensity: 1.5,
	temperature: 0.5,
	speed: 1.0,
};

function BlackholeRetryTemplate() {
	const [params, setParams] = useState<BlackholeParams>(defaultParams);

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
				<div className={styles.brand}>
					GARGANTUA <span className={styles.brandAccent}>WebGPU</span>
				</div>
				<a
					href={headerLink.href}
					target="_blank"
					rel="noreferrer"
					className={styles.sourceLink}
				>
					{headerLink.label}
				</a>
			</header>

			<BlackholeRetryCanvas params={params} />

			<Controls value={params} onChange={setParams} />

			<div className={styles.instructions}>드래그하여 회전 / 휠로 줌</div>
		</div>
	);
}

export default BlackholeRetryTemplate;
