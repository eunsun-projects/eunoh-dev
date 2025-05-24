/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useClickSound from "../_hooks/useClickSound";
import styles from "../_styles/tutorial.module.css";
import Smoke from "./Smoke";
import { Hankyoreh, SinistreBold, YuniverseBold } from "./paradiseFonts";

interface NarrationProps {
  setFunnel: (funnel: number) => void;
}

const fullText =
  "장충단공원이라.\n여기서 멀지 않은 곳인데.\n무슨 사연이 있어서\n이런 아름다운 시를 적어놓은 걸까.\n맞아.\n장충동에 명산물이 없는 것이 아니지.\n나는 그걸 알고 있지.\n그건 안개였어.";

export default function Narration({ setFunnel }: NarrationProps) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const playClickSound = useClickSound();

  const router = useRouter();

  const handleModal = () => {
    playClickSound();
    router.push("/tests/paradise");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText.charAt(index));
        setIndex(index + 1);
      }, 50); // 타이핑 속도 조절
    }
  }, [index]);

  return (
    <>
      <div className={styles.backdiv}>
        <div className={styles.maindiv}>
          <div className={styles.leftdiv} />

          <div className={`${styles.middiv} ${Hankyoreh.className}`}>
            <div className={styles.narrationmid}>
              {index === 101 && (
                <div className={styles.narrasmoke}>
                  <Smoke />
                </div>
              )}
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

              <div
                className={`${styles.lastnarration} ${YuniverseBold.className}`}
              >
                <p>{text}</p>
              </div>

              <div className={styles.narrabtnbox}>
                <div
                  className={`${styles.narrabtncon} ${SinistreBold.className}`}
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
    </>
  );
}
