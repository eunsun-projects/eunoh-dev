"use client";

import Image from "next/image";
import useClickSound from "../_hooks/useClickSound";
import styles from "../_styles/tutorial.module.css";
import { SinistreBold } from "./paradiseFonts";

const text = [
	`각진 턱선이 특징인 얼굴형.
    다소 넓은 이마와 진한 눈썹.
    두꺼운 프레임의 사각형 안경.`,
];

interface QrProps {
	setFunnel: (funnel: number) => void;
}

function Qr({ setFunnel }: QrProps) {
	const playClickSound = useClickSound();
	const handleModal = () => {
		playClickSound();
		setFunnel(2);
	};

	return (
		<div className={styles.backdiv}>
			<div className={styles.maindiv}>
				<div className={styles.leftdiv} />

				<div className={styles.qrmiddiv}>
					{/* <div className={styles.fullmonitorvideos}>
              <video
                className={styles.video1}
                muted
                loop
                autoPlay
                playsInline
                height={'100%'}
                src="/assets/paradise/base-static.mp4"
                style={{ opacity: '0.4' }}
              ></video>
            </div> */}
					<div className={styles.qrtitle}>
						<p>실종자를 찾습니다.</p>
					</div>
					<div className={styles.qrimgbox}>
						<Image
							priority
							src={"/assets/paradise/3.webp"}
							alt="elements"
							fill
							sizes="(max-width: 1920px) 100%, 100%"
						/>
					</div>

					<div className={styles.qrcontents}>
						<p>인상착의 및 특징</p>
						<p>{text}</p>
						<p>* XX년 X월 X일경 택시를 타러 나갔으나 그 뒤로 돌아오지 않음</p>
						<p>
							위 사람을 본적이 있거나\n아시는 분이 있다면 바로 연락
							부탁드립니다.
						</p>
					</div>

					<div
						className={styles.qrbtnbox}
						style={{ position: "fixed", bottom: "0%" }}
					>
						<div
							tabIndex={0}
							role="button"
							aria-label="Next"
							aria-pressed="false"
							aria-expanded="false"
							aria-haspopup="dialog"
							aria-describedby="next-description"
							aria-labelledby="next-title"
							aria-controls="next-content"
							className={`${styles.qrbtncon} ${SinistreBold.className}`}
							onKeyDown={handleModal}
							onClick={handleModal}
						>
							next
						</div>
					</div>
				</div>

				<div className={styles.rightdiv} />
			</div>
		</div>
	);
}

export default Qr;
