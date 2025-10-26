"use client";
import useClickSound from "../_hooks/useClickSound";
import styles from "../_styles/tutorial.module.css";
import { Hankyoreh, SinistreBold, uhbeeyul } from "./paradiseFonts";

interface DiaryProps {
	setFunnel: (funnel: number) => void;
}

export default function Diary({ setFunnel }: DiaryProps) {
	const playClickSound = useClickSound();

	const handleModal = () => {
		playClickSound();
		setFunnel(4);
	};

	return (
		<div className={styles.backdiv}>
			<div className={styles.maindiv}>
				<div className={styles.leftdiv} />

				<div className={`${styles.middiv} ${Hankyoreh.className}`}>
					<div className={styles.diarymid}>
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

						<div className={styles.notebox}>
							<div className={`${styles.notefull} ${uhbeeyul.className}`}>
								<p style={{ textAlign: "right" }}>
									<span className={styles.diaryfont}>6월 1일</span>
								</p>
								<p>
									<span className={styles.diaryfont}>선생님 기억나세요?</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										저희 처음 만난 날, 막 차가워지던 가을에
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										신식 태극당에서 수줍게 인사드렸었는데.
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										저는 선생님 처음 만난 날이
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										영화의 한 장면 같았어요.
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										다른 날들보다 유독 따뜻했던
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>날이었던 것 같아요.</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										잠시 가을의 추위가 멈추던.
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										긴장을 참 많이 했는데
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										선생님은 화면에서처럼 멋지셨고
									</span>
								</p>
								<p>
									<span className={styles.diaryfont}>
										저는 이게 꿈인가 싶었던 것 같아요.
									</span>
								</p>
								<p>&nbsp;</p>
								<p>&nbsp;</p>
								<p>&nbsp;</p>
								<p>&nbsp;</p>
							</div>
						</div>

						<div className={styles.qrbtnbox}>
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
				</div>

				<div className={styles.rightdiv} />
			</div>
		</div>
	);
}
