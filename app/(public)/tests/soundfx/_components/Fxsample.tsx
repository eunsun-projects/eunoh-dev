'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../_styles/soundfx.module.css';
import Player from './Player';

export const musicUrlArr = [
  {
    num: 0,
    name: '0_soul',
    url: '/assets/soundfx/00_windy soul.mp3',
  },
  {
    num: 1,
    name: '1_human-voice',
    url: '/assets/soundfx/human-voice.mp3',
  },
  {
    num: 2,
    name: '2_bossa',
    url: '/assets/soundfx/02_aoi bossa.mp3',
  },
  {
    num: 3,
    name: '3_espana',
    url: '/assets/soundfx/03_espana.mp3',
  },
  {
    num: 4,
    name: '4_spill',
    url: '/assets/soundfx/04_spill.mp3',
  },
];
export const impulseUrlArr = [
  {
    num: 0,
    name: 'telephone',
    url: '/assets/soundfx/impulse-2/telephone.wav',
  },
  {
    num: 1,
    name: 'lowpass',
    url: '/assets/soundfx/impulse-2/lowpass.wav',
  },
  {
    num: 2,
    name: 'spring',
    url: '/assets/soundfx/impulse-2/spring.wav',
  },
  {
    num: 3,
    name: 'echo',
    url: '/assets/soundfx/impulse-2/echo.wav',
  },
];

export type CustomAudioBuffer = {
  name: string;
  num: number;
  buffer: AudioBuffer;
};

export type FxObj = {
  isPlaying: boolean;
  currIndex: number;
  startTime: number;
  pauseTime: number;
  offsetTime: number;
  currBuffer: AudioBuffer | null;
  currSource: AudioBufferSourceNode | null;
  volControlGainNode: GainNode | null;
  currConvolver: ConvolverNode | null;
};

function Fxsample() {
  const [xyzAudioContext, setXyzAudioContext] = useState<AudioContext | null>(null); // 웹오디오에서 계속 쓰일 오디오 콘텍스트 용 스테이트
  const [audioArr, setAudioArr] = useState<CustomAudioBuffer[]>([]); // 오디오버퍼 중 음악 트랙들의 버퍼를 담을 스테이트
  const [impulseArr, setImpulseArr] = useState<CustomAudioBuffer[]>([]); // 오디오버퍼 중 효과 트랙들의 버퍼를 담을 스테이트
  const [suspended, setSuspended] = useState(true); // 최초 사용자 인터랙션 체크용, 시작시 true (중지상태) 클릭시 false(시작)
  const [fxObj, setFxObj] = useState<FxObj | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  // 프로미스 함수 생성 fetch 가 완료되면 decodeAudioData 반환
  function xyzAudioFetch(context: AudioContext, url: string, name: string, num: number) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
        .then((decoded) => {
          const audioBuffer = decoded;
          const newAudioBuffer = {
            name,
            num,
            buffer: audioBuffer,
          };
          resolve(newAudioBuffer);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  // 최초 사용자 인터랙션 체크를 위해 만들어둔 오버레이 클릭 핸들러 함수
  const handleOverlayClick = () => {
    setSuspended(false);
    const context = new AudioContext(); // 오디오 콘텍스트 객체 생성!

    // 사용자 인터랙션이 발생했으니, 콘텍스트를 시작 메소드 실행
    context
      .resume()
      .then(() => {
        console.log(context);
        setXyzAudioContext(context);

        const obj: FxObj = {
          isPlaying: false,
          currIndex: 0,
          startTime: 0,
          pauseTime: 0,
          offsetTime: 0,
          currBuffer: null,
          currSource: null,
          volControlGainNode: null,
          currConvolver: null,
        };
        setFxObj(obj);
      })
      .catch((err) => console.log(err));
  };

  // suspended 스테이트 상태 변화되면 실행되는 useEffect 여기서 fetch 수행
  useEffect(() => {
    // 만약 상호작용이 시작되어 suspended 가 false 일때 실행
    if (suspended === false && xyzAudioContext !== null) {
      // 콘텍스트의 상태가 '실행중' 이면 수행
      if (xyzAudioContext.state === 'running') {
        const arr: CustomAudioBuffer[] = []; // 음악 트랙 fetch 결과를 저장할 임시 배열
        const arr2: CustomAudioBuffer[] = []; // 효과 트랙 fetch 결과를 저장할 임시 배열

        // 음악 트랙 데이터 배열을 기준으로 fetch 반복 실행
        musicUrlArr.forEach((e) => {
          xyzAudioFetch(xyzAudioContext, e.url, e.name, e.num)
            .then((data: unknown) => {
              arr.push(data as CustomAudioBuffer);
              return arr;
            })
            .then((arr) => {
              // 원배열과 길이가 같아지면, 즉 모두 받아왔으면 리액트 스테이트 변경
              if (arr.length === musicUrlArr.length) {
                arr.sort(function (a, b) {
                  return a.num - b.num;
                });
                // console.log(arr)
                setAudioArr(arr);
              }
            });
        });

        impulseUrlArr.forEach((e) => {
          xyzAudioFetch(xyzAudioContext, e.url, e.name, e.num)
            .then((data: unknown) => {
              arr2.push(data as CustomAudioBuffer);
              return arr2;
            })
            .then((arr) => {
              // 원배열과 길이가 같아지면, 즉 모두 받아왔으면 리액트 스테이트 변경
              if (arr.length === impulseUrlArr.length) {
                arr.sort(function (a, b) {
                  return a.num - b.num;
                });
                setImpulseArr(arr);
              }
            });
        });
      }
    }
  }, [suspended, xyzAudioContext]);

  useEffect(() => {
    /** ============ set screensize =============== */
    function setScreenSize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    /** ====== Generate a resize event if the device doesn't do it ====== */
    window.addEventListener(
      'orientationchange',
      () => window.dispatchEvent(new Event('resize')),
      false,
    );
    window.addEventListener('resize', setScreenSize);
    window.dispatchEvent(new Event('resize'));

    return () => {
      window.removeEventListener(
        'orientationchange',
        () => window.dispatchEvent(new Event('resize')),
        false,
      );
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시
      if (xyzAudioContext) {
        // 1) 재생 중인 소스를 stop
        if (fxObj?.currSource) {
          try {
            fxObj.currSource.stop();
          } catch (error) {
            console.error('Error stopping source:', error);
          }
        }

        // 2) AudioContext 종료
        if (xyzAudioContext.state !== 'closed') {
          xyzAudioContext.close().catch((err) => console.error(err));
        }
      }
    };
  }, [xyzAudioContext, fxObj]);

  return (
    <>
      <div
        className={styles.webapoverlay}
        ref={overlayRef}
        style={{ display: suspended ? 'block' : 'none' }}
        onClick={handleOverlayClick}
      >
        <p className="cursor-pointer">click to play</p>
      </div>
      <div className={styles.webapcontainer}>
        {suspended === false && xyzAudioContext && fxObj && impulseArr && (
          <Player
            context={xyzAudioContext}
            audioBuffer={audioArr}
            impulseBuffer={impulseArr}
            fxObj={fxObj}
          />
        )}
      </div>
    </>
  );
}

export default Fxsample;
