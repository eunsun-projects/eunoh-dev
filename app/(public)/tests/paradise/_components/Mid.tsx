"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useClickSound from "../_hooks/useClickSound";
import styles from "../_styles/paradise.module.css";
import { useAudio } from "./AudioProvider";
import { SinistreBold, YuniverseBold } from "./paradiseFonts";

const midtext = [
	"",

	"*본 페이지는 웹 작품 <Paradise Way>의 인트로 시퀀스 샘플입니다. 실제 프로젝트시에는 위치기반서비스(GPS)를 사용하여 진행될 예정이나, 현재 샘플 제작을 위해 자동으로 진행되도록 하였습니다. \n\n실제 프로젝트 진행시에는 벽보로 부착된 QR코드를 촬영하여 본 페이지로 접근하게 됩니다.",

	`Paradise Way 프로젝트는 
    여러분의 위치정보(GPS)를
    바탕으로 진행됩니다.
    위치정보활용 안내창이 보이면
    ‘허용’을 선택해주세요.`,

	`파라다이스 웨이 프로젝트는
    소리와 함께 진행됩니다. 
    최적의 경험을 위해
    소리를 켜고 볼륨을 조절해주세요. 
    헤드폰이나 이어폰 착용을 권장드립니다.`,
];

export default function Mid() {
	const [intro, setIntro] = useState(0);
	const [btn, setBtn] = useState("Play");
	const router = useRouter();
	const { setPlaying } = useAudio();
	const playClickSound = useClickSound();

	const titleRef = useRef<HTMLDivElement | null>(null);
	const btnRef = useRef<HTMLDivElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handlestart = () => {
		if (!audioRef.current) return;
		playClickSound();
		if (intro < 1) {
			setIntro((prev) => prev + 1);
			setBtn("next");
			setPlaying(true);
			audioRef.current.load();
			audioRef.current.muted = false;
			audioRef.current.loop = true;
			audioRef.current
				.play()
				.then(() => {
					console.log("대기실 곡 재생 시작!");
				})
				.catch((error) => {
					console.log(error);
					if (confirm("에러발생. 새로고침 하시겠습니까?")) {
						window.location.reload();
					} else {
						alert("에러발생, 에러발생");
					}
				});
		} else if (intro < 3) {
			setIntro((prev) => prev + 1);
			setBtn("next");
		} else if (intro === 3) {
			router.push("/tests/paradise/tutorial");
		}
	};

	useEffect(() => {
		if (!titleRef.current) return;
		const spanRef = titleRef.current.childNodes;

		setTimeout(() => {
			spanRef.forEach((e) => {
				(e as HTMLElement).style.animation = `${styles.settitleShow} 2s linear`;
			});
		}, 2200);
		setTimeout(() => {
			if (!btnRef.current) return;
			btnRef.current.style.opacity = "1";
		}, 2500);
	}, []);

	return (
		<>
			<audio
				ref={audioRef}
				src="/assets/paradise/paradise_sax.mp3"
				preload="metadata"
				autoPlay
				muted
			/>
			{/* 타이틀 */}
			<div className={styles.titlebox}>
				<div
					ref={titleRef}
					className={`${styles.title} ${SinistreBold.className}`}
				>
					<span>P</span>
					<span>a</span>
					<span>r</span>
					<span>a</span>
					<span>d</span>
					<span>i</span>
					<span>s</span>
					<span>e</span>
					<span>&nbsp;</span>
					<span>W</span>
					<span>a</span>
					<span>y</span>
				</div>
			</div>
			{/* 내용 */}
			<div className={styles.contentswrapper}>
				<p
					className={`${styles.contents} ${YuniverseBold.className}`}
					style={{ textAlign: intro !== 1 ? "center" : undefined }}
				>
					{midtext[intro]}
				</p>
			</div>
			{/* 버튼 */}
			<div className={styles.introbottom}>
				<div
					tabIndex={0}
					role="button"
					aria-label="Start"
					aria-pressed="false"
					aria-expanded="false"
					aria-haspopup="dialog"
					aria-describedby="start-description"
					aria-labelledby="start-title"
					aria-controls="start-content"
					ref={btnRef}
					className={`${styles.introbtn} ${SinistreBold.className}`}
					onKeyDown={handlestart}
					onClick={handlestart}
				>
					{btn}
				</div>
			</div>
		</>
	);
}
