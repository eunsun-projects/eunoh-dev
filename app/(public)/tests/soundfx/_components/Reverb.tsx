"use client";

import { useEffect, useState } from "react";
import styles from "../_styles/soundfx.module.css";
import type { CustomAudioBuffer, FxObj } from "./Fxsample";

interface CustomConvolverNode extends ConvolverNode {
	sel: number;
}

interface ReverbProps {
	context: AudioContext;
	impulseBuffer: CustomAudioBuffer[];
	fxObj: FxObj;
}

export default function Reverb({ context, impulseBuffer, fxObj }: ReverbProps) {
	const [convolverArr, setConvolverArr] = useState<CustomConvolverNode[]>([]);
	const [click, setClick] = useState<number[]>([]);

	function setReverb(index: number) {
		const value = index;
		if (click.includes(value)) {
			const copy = [...convolverArr];
			const filter = copy.filter((item) => {
				if (item.sel === value) {
					item.disconnect();
					item.buffer = null;
				}
				return item.sel !== value;
			});
			setConvolverArr(filter);
		} else {
			const convolver = context.createConvolver() as CustomConvolverNode;
			convolver.sel = index;
			const impulseResponseBuffer = impulseBuffer[value];

			const wetGainNode = context.createGain();

			convolver.buffer = impulseResponseBuffer.buffer;

			convolver.connect(wetGainNode);
			wetGainNode.connect(context.destination);
			if (index === 0) {
				wetGainNode.gain.value = 20;
			} else {
				wetGainNode.gain.value = 1.5;
			}

			fxObj.currSource?.connect(convolver);

			const copy = [...convolverArr];
			copy.push(convolver);
			setConvolverArr(copy);
			fxObj.currConvolver = convolver;
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		const value = Number(target.dataset.value);
		if (value === undefined) return;
		setReverb(value);

		const copy = [...click];
		if (copy.includes(value)) {
			const filter = copy.filter((e) => e !== value);
			setClick(filter);
		} else {
			copy.push(value);
			setClick(copy);
		}
	};

	useEffect(() => {
		if (convolverArr.length > 0 && fxObj.isPlaying) {
			for (const e of convolverArr) {
				fxObj.currSource?.connect(e);
			}
		}
	}, [convolverArr, fxObj.currSource, fxObj.isPlaying]);

	return (
		<div className={styles.webapbox}>
			<p style={{ fontSize: "1.2rem" }}>reverb</p>
			<div className={styles.webapreverbbox}>
				<div className={styles.webaptel} style={{ cursor: "pointer" }}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: for handleClick */}
					<div
						tabIndex={0}
						role="button"
						aria-label="Telephone"
						aria-pressed="false"
						aria-expanded="false"
						aria-haspopup="dialog"
						aria-describedby="telephone-description"
						aria-labelledby="telephone-title"
						aria-controls="telephone-content"
						data-value={0}
						onClick={handleClick}
						className={click.includes(0) ? styles.reverbclick : styles.reverb}
					/>
					<p>Telephone</p>
				</div>
				<div className={styles.webaptel} style={{ cursor: "pointer" }}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: for handleClick */}
					<div
						tabIndex={0}
						role="button"
						aria-label="Lowpass"
						aria-pressed="false"
						aria-expanded="false"
						aria-haspopup="dialog"
						aria-describedby="lowpass-description"
						aria-labelledby="lowpass-title"
						aria-controls="lowpass-content"
						data-value={1}
						onClick={handleClick}
						className={click.includes(1) ? styles.reverbclick : styles.reverb}
					/>
					<p>lowpass</p>
				</div>
				<div className={styles.webaptel} style={{ cursor: "pointer" }}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: for handleClick */}
					<div
						tabIndex={0}
						role="button"
						aria-label="Spring"
						aria-pressed="false"
						aria-expanded="false"
						aria-haspopup="dialog"
						aria-describedby="spring-description"
						aria-labelledby="spring-title"
						aria-controls="spring-content"
						data-value={2}
						onClick={handleClick}
						className={click.includes(2) ? styles.reverbclick : styles.reverb}
					/>
					<p>Spring</p>
				</div>
				<div className={styles.webaptel} style={{ cursor: "pointer" }}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: for handleClick */}
					<div
						tabIndex={0}
						role="button"
						aria-label="Echo"
						aria-pressed="false"
						aria-expanded="false"
						aria-haspopup="dialog"
						aria-describedby="echo-description"
						aria-labelledby="echo-title"
						aria-controls="echo-content"
						data-value={3}
						onClick={handleClick}
						className={click.includes(3) ? styles.reverbclick : styles.reverb}
					/>
					<p>Echo</p>
				</div>
			</div>
		</div>
	);
}
