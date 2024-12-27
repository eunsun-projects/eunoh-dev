/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useClickSound from '../_hooks/useClickSound';
import styles from '../_styles/tutorial.module.css';
import { Hankyoreh, SinistreBold, YuniverseBold } from './paradiseFonts';

interface NewspaperProps {
  setFunnel: (funnel: number) => void;
}

function Newspaper({ setFunnel }: NewspaperProps) {
  const fullText = `누군가 실종됐나 본데..\n아까 내가 찍었던 포스터와 연결되는 건가..?\n그런데 주머니에 이게 뭐지...\n일기장..?\n일단 일기장이 있으니 첫 장을 펴보자.`;

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const playClickSound = useClickSound();

  const handleModal = () => {
    playClickSound();
    setFunnel(3);
  };

  useEffect(() => {
    // console.log(index)
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
          <div className={styles.leftdiv}></div>

          <div className={`${styles.middiv} ${Hankyoreh.className}`}>
            <div className={styles.newsmid}>
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
              <div className={styles.newspaperfull}>
                <div className={styles.newsimgbox}>
                  <Image
                    priority
                    src={'/assets/paradise/newspaper2.webp'}
                    alt="elements"
                    fill
                    sizes="(max-width: 1920px) 100%, 100%"
                  ></Image>
                </div>
              </div>

              <div className={`${styles.narration} ${YuniverseBold.className}`}>
                <p>{text}</p>
              </div>

              <div className={styles.qrbtnbox}>
                <div
                  className={`${styles.qrbtncon} ${SinistreBold.className}`}
                  onClick={handleModal}
                >
                  next
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightdiv}></div>
        </div>
      </div>
    </>
  );
}

export default Newspaper;
