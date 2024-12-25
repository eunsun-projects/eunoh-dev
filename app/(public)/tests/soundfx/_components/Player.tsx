'use client';

import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaStop, FaVolumeUp } from 'react-icons/fa';
import styles from '../_styles/soundfx.module.css';
import Filter from './Filter';
import { CustomAudioBuffer, FxObj, musicUrlArr } from './Fxsample';
import Reverb from './Reverb';
import Visualizer from './Visualizer';

interface PlayerProps {
  context: AudioContext;
  audioBuffer: CustomAudioBuffer[];
  impulseBuffer: CustomAudioBuffer[];
  fxObj: FxObj;
}

export default function Player({ context, audioBuffer, impulseBuffer, fxObj }: PlayerProps) {
  const [value, setValue] = useState<string | number>(100);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [maxM, setMaxM] = useState<string | null>(null);
  const [nowM, setNowM] = useState<string | null>(null);
  const [select, setSelect] = useState(0);
  const [fxObjState, setFxObjState] = useState<FxObj>(fxObj);

  const inputRef = useRef<HTMLInputElement>(null);
  const rafRef = useRef<number | null>(null);

  // 실제 재생(Play) 함수
  function play(index = fxObj.currIndex) {
    const copy = { ...fxObjState };

    // 이미 재생 중인 소스가 있다면 먼저 stop 시도
    if (copy.currSource) {
      try {
        copy.currSource.stop();
      } catch (error) {
        console.error('Audio source stop error during play:', error);
      }
    }

    // 새 소스 생성 및 재생
    const buffer = audioBuffer[index];
    const newSource = context.createBufferSource();
    newSource.buffer = buffer.buffer;

    if (copy.volControlGainNode) {
      newSource.connect(copy.volControlGainNode);
    } else {
      // 볼륨 노드가 없으면 직접 destination에 연결
      newSource.connect(context.destination);
    }

    // 여기서 비로소 start
    newSource.start(0, copy.offsetTime);

    // 상태 업데이트
    copy.currSource = newSource;
    copy.startTime = context.currentTime;
    copy.currIndex = index;
    copy.isPlaying = true;

    newSource.onended = () => {
      let nextIndex = copy.currIndex + 1;
      if (nextIndex === audioBuffer.length) nextIndex = 0;

      // 반복 재생이 필요하다면 다시 play 호출
      // offsetTime은 처음부터 재생하므로 0으로
      copy.offsetTime = 0;
      setFxObjState(copy);
      play(nextIndex);
      setSelect(nextIndex);
    };

    setFxObjState(copy);

    // 곡 길이 표시
    const max = dayjs(buffer.buffer.duration * 1000).format('mm:ss');
    // setMaxM(max);

    // 실제 재생 UI 갱신
    setPlaying(true);
  }

  // 일시 정지(Pause) 함수
  function pause() {
    const copy = { ...fxObjState };
    // 아직 start() 하지 않은 노드거나 이미 재생중이 아닌 경우 return
    if (!copy.currSource || !copy.isPlaying) {
      return;
    }

    try {
      copy.currSource.stop();
    } catch (error) {
      console.error('Audio source stop error:', error);
    }

    // 현재까지 플레이된 시간 계산
    const currentTime = context.currentTime - copy.startTime + copy.offsetTime;
    copy.offsetTime = currentTime;
    copy.isPlaying = false;

    // onended 핸들러 제거 후 소스 초기화
    copy.currSource.onended = null;
    copy.currSource = null;
    setFxObjState(copy);
    setPlaying(false);
  }

  // 재생/일시정지 토글
  function toggle() {
    if (fxObjState.isPlaying) {
      pause();
      setPlaying(false);
    } else {
      play();
      setPlaying(true);
    }
  }

  // 정지(Stop) 함수
  function stop() {
    const copy = { ...fxObjState };

    // 아직 start()되지 않았거나 이미 멈춰있다면 중단
    if (!copy.currSource || !copy.isPlaying) {
      return;
    }

    try {
      copy.currSource.stop();
    } catch (error) {
      console.error('Audio source stop error:', error);
    }

    // 모든 상태 초기화
    copy.pauseTime = 0;
    copy.offsetTime = 0;
    copy.startTime = 0;
    copy.currSource.onended = null;
    copy.currSource = null;
    copy.isPlaying = false;
    setFxObjState(copy);

    setPlaying(false);
  }

  // 볼륨 조절
  function changeVolume(element: HTMLInputElement) {
    const copy = { ...fxObjState };
    if (copy.volControlGainNode) {
      copy.volControlGainNode.gain.value = Number(element.value);
    }
    setFxObjState(copy);
  }

  // Play 버튼 핸들러
  const handlePlayClick = () => {
    toggle();
  };

  // Stop 버튼 핸들러
  const handleStopClick = () => {
    if (rafRef.current) {
      stop();
      cancelAnimationFrame(rafRef.current);
      setProgress(0);
    }
  };

  // 볼륨 슬라이더 변경
  const handleVolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    changeVolume(e.currentTarget);
  };

  // 트랙 리스트에서 클릭 시 재생
  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = Number(target.dataset.num);

    // 현재 선택된 index와 다르면 새 곡 재생
    if (fxObjState.currIndex !== index) {
      if (playing) {
        stop();
        setSelect(index);
      }
      setSelect(index);
      // offsetTime 초기화 후 새로운 소스 재생
      const copy = { ...fxObjState };
      copy.offsetTime = 0;
      copy.currIndex = index;
      setFxObjState(copy);

      play(index);
    }
  };

  useEffect(() => {
    // 오디오 버퍼가 로드되면 볼륨 노드를 준비 (BufferSource는 여기서 만들지 않음)
    if (audioBuffer.length > 0) {
      if (!fxObjState.volControlGainNode) {
        const volControlGainNode = context.createGain();
        volControlGainNode.connect(context.destination);
        fxObjState.volControlGainNode = volControlGainNode;
      }

      // (Optional) 만약 초기 상태에서 표시할 정보가 필요하다면
      // 첫 번째 트랙의 길이를 표시해놓기
      const firstTrack = audioBuffer[0];
      const max = dayjs(firstTrack.buffer.duration * 1000).format('mm:ss');
      setMaxM(max);
      setNowM(dayjs(0).format('mm:ss'));
    }
  }, [audioBuffer, context, fxObjState]);

  // 마운트 시, GainNode 등 초기화 + 재생 진행 상황을 raf로 업데이트
  useEffect(() => {
    // --- Progress 업데이트 함수 ---
    const updateProgress = () => {
      const copy = { ...fxObjState };
      if (!copy.currSource || !copy.currSource.buffer || !copy.isPlaying) {
        return;
      }

      // 재생 시간 및 퍼센트
      const currentTime = context.currentTime - copy.startTime + copy.offsetTime;
      const duration = copy.currSource.buffer.duration;
      const newProgress = (currentTime / duration) * 100;
      const now = dayjs(currentTime * 1000).format('mm:ss');

      setProgress(newProgress);
      setNowM(now);

      rafRef.current = requestAnimationFrame(updateProgress);
    };

    if (playing) {
      rafRef.current = requestAnimationFrame(updateProgress);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [audioBuffer, context, fxObjState, playing]);

  return (
    <>
      {maxM === null ? (
        <div className={styles.webaploadingback}>
          <div className={styles.webapload}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <p>FX sample</p>
          <div className={styles.webapbox}>
            <p style={{ fontSize: '1.2rem' }}>player</p>
            <div className={styles.webapprogress}>
              <progress
                id="webapprogbar"
                className={styles.webapprogressbar}
                value={progress}
                max={100}
              ></progress>
            </div>
            <div className={styles.webapplaybtn} style={{ cursor: 'pointer' }}>
              <div className="flex gap-2">
                {playing ? (
                  <FaPause onClick={handlePlayClick} />
                ) : (
                  <FaPlay onClick={handlePlayClick} />
                )}
                <FaStop onClick={handleStopClick} />
                <FaVolumeUp />
              </div>
              <input
                ref={inputRef}
                type="range"
                min={-1}
                max={0.5}
                step={0.01}
                value={value}
                onChange={handleVolChange}
              />
              <p style={{ fontSize: '13px' }} className="min-w-[100px]">
                {nowM} / {maxM}
              </p>
            </div>
            <div className={styles.webaplist} style={{ cursor: 'pointer' }}>
              {musicUrlArr.map((item, i) => (
                <p
                  key={i}
                  data-num={i}
                  style={{ color: select === i ? '#000' : '#fff' }}
                  onClick={handleListClick}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          {/* 리버브, 필터, 비주얼라이저 등 (필요한 노드에 fxObj.volControlGainNode 등을 연결해 사용) */}
          <Reverb context={context} impulseBuffer={impulseBuffer} fxObj={fxObjState} />
          <Filter context={context} fxObj={fxObjState} />
          <Visualizer context={context} fxObj={fxObjState} />
        </>
      )}
    </>
  );
}
