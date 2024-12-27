'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import useClickSound from '../_hooks/useClickSound';
import styles from '../_styles/tutorial.module.css';
import { useAudio } from './AudioProvider';
import Diary from './Diary';
import Narration from './Narration';
import Newspaper from './NewsPaper';
import { Hankyoreh, YuniverseBold } from './paradiseFonts';
import Qr from './Qr';
interface Coords {
  latitude: number;
  longitude: number;
}

interface GPSdata {
  lat: number;
  long: number;
  date?: {
    year: number;
    month: string | number;
    day: string | number;
    hour: string | number;
    min: string | number;
  };
}

type Timestamp = number;

const fullText = `껌뻑. 눈을 떠보니 동대입구역 지하철 의자에 앉아있다.
내가 누구지? 나에 대해 기억나는 것은 없다.
나는 누구지? 무엇인가 중요한 것을 잃어버린 것 같은데. 혼란스럽다.
집 근처도 아닌데 동대입구역에는 왜 앉아 있는 것인지.
그보다 머리가 깨질 것 같다.
지하철역 안의 공기가 메스꺼워 황급히 눈에 보이는 2번 출구로 올라왔다.
휴. 바깥 공기를 마시니 좀 살 것 같다.
머리가 뿌연 느낌이다.
눈 앞에는 왠지 익숙해보이는 태극당과 길거리.
그런데 이게 뭐지? 실종포스터?`;

export default function Tutorial() {
  const [funnel, setFunnel] = useState(0);
  const [img, setImg] = useState('/assets/paradise/1.webp');
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [gps, setGps] = useState({});
  const { isPlaying, setPlaying } = useAudio();
  const playClickSound = useClickSound();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mastRef = useRef<HTMLParagraphElement | null>(null);

  const success = async ({ coords, timestamp }: { coords: Coords; timestamp: Timestamp }) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    const gpsData: GPSdata = {
      lat: coords.latitude,
      long: coords.longitude,
    };

    gpsData.date = {
      year: year,
      month: month,
      day: day,
      hour: hour,
      min: min,
    };
    setGps(gpsData);
  };

  function error(err: GeolocationPositionError) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('위치정보가 지원되지 않습니다');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  const handleModal = () => {
    playClickSound();
    setFunnel(1);
  };

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText((prev) => prev + '<span>' + fullText.charAt(index) + '</span>');
        setIndex((prev) => prev + 1);
      }, 50); // 타이핑 속도 조절
    }
    if (index === 210) {
      setImg('/assets/paradise/2.webp');
    }
    if (index >= 265 && mastRef.current) {
      mastRef.current.style.animation = 'none';
      mastRef.current.style.opacity = '0.7';
    }
  }, [index]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.muted = false;
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => {
          console.log('튜토리얼 곡 재생 시작!');
        })
        .catch((error: Error) => {
          console.log(error);
          if (confirm('에러발생. 새로고침 하시겠습니까?')) {
            window.location.reload();
          } else {
            alert('에러발생, 에러발생');
          }
        });
    }
  }, [isPlaying]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/paradise/paradise_opening_novox.mp3"
        preload="metadata"
        autoPlay
        muted
        loop
      />
      {funnel === 4 && <Narration setFunnel={setFunnel} />}
      {funnel === 3 && <Diary setFunnel={setFunnel} />}
      {funnel === 2 && <Newspaper setFunnel={setFunnel} />}
      {funnel === 1 && <Qr setFunnel={setFunnel} />}
      {funnel === 0 && (
        <div className={styles.backdiv}>
          <div className={styles.maindiv}>
            <div className={styles.leftdiv}></div>

            <div className={`${styles.middiv} ${Hankyoreh.className}`}>
              <div className={styles.fullmonitorvideos}>
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
              </div>

              <div className={styles.imgbox}>
                <Image
                  priority
                  src={img}
                  alt="elements"
                  fill
                  sizes="(max-width: 1920px) 100%, 100%"
                ></Image>
              </div>
              <div className={styles.mastbox}>
                <p
                  ref={mastRef}
                  className={`${styles.mast} ${YuniverseBold.className}`}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></p>
              </div>
              <div className={styles.btnbox}>
                <div
                  className={`${styles.btncon} ${YuniverseBold.className}`}
                  onClick={handleModal}
                >
                  {index >= 265 && '실종포스터보기'}
                </div>
              </div>
            </div>

            <div className={styles.rightdiv}></div>
          </div>
        </div>
      )}
    </>
  );
}
