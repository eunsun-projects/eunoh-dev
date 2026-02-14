"use client";

import styles from "../_styles/blackhole-retry.module.css";

export type BlackholeParams = {
	mass: number;
	intensity: number;
	temperature: number;
	speed: number;
};

type Props = {
	value: BlackholeParams;
	onChange: (next: BlackholeParams) => void;
};

function Controls({ value, onChange }: Props) {
	return (
		<section className={styles.controls} aria-label="제어 패널">
			<h2 className={styles.controlsTitle}>
				<svg
					aria-hidden="true"
					focusable="false"
					width="20"
					height="20"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
				</svg>
				제어 패널
			</h2>

			<div className={styles.controlGroup}>
				<label className={styles.controlLabel} htmlFor="mass">
					<span>블랙홀 질량 (Mass)</span>
					<span className={styles.controlValue}>{value.mass.toFixed(1)}</span>
				</label>
				<input
					id="mass"
					type="range"
					min={0.1}
					max={3.0}
					step={0.1}
					value={value.mass}
					onChange={(e) => onChange({ ...value, mass: Number(e.target.value) })}
				/>
			</div>

			<div className={styles.controlGroup}>
				<label className={styles.controlLabel} htmlFor="intensity">
					<span>원반 밝기 (Intensity)</span>
					<span className={styles.controlValue}>
						{value.intensity.toFixed(1)}
					</span>
				</label>
				<input
					id="intensity"
					type="range"
					min={0.1}
					max={5.0}
					step={0.1}
					value={value.intensity}
					onChange={(e) =>
						onChange({ ...value, intensity: Number(e.target.value) })
					}
				/>
			</div>

			<div className={styles.controlGroup}>
				<label className={styles.controlLabel} htmlFor="temperature">
					<span>가스 온도 (Temperature)</span>
					<span className={styles.controlValue}>
						{value.temperature.toFixed(2)}
					</span>
				</label>
				<input
					id="temperature"
					type="range"
					min={0.0}
					max={1.0}
					step={0.01}
					value={value.temperature}
					onChange={(e) =>
						onChange({ ...value, temperature: Number(e.target.value) })
					}
				/>
			</div>

			<div className={styles.controlGroup}>
				<label className={styles.controlLabel} htmlFor="speed">
					<span>시뮬레이션 속도 (Speed)</span>
					<span className={styles.controlValue}>{value.speed.toFixed(1)}</span>
				</label>
				<input
					id="speed"
					type="range"
					min={0.0}
					max={5.0}
					step={0.1}
					value={value.speed}
					onChange={(e) =>
						onChange({ ...value, speed: Number(e.target.value) })
					}
				/>
			</div>
		</section>
	);
}

export default Controls;
