/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { Suspense, useEffect, useRef, useState } from 'react';
import styles from '../_styles/modern-move.module.css';

import { useRouter } from 'next/navigation';
import Landscape from './Landscape';
import MmLoader from './MmLoader';
import { useModernMoveContext } from './ModernMoveContext';
import MoonLoaderBlack from './MoonLoaderBlack';
import VaporwaveScene from './VaporScene';

export default function ModernMoveTemplate() {
  const [innerW, setInnerW] = useState<number | null>(null);
  const [awaiting, setAwaiting] = useState(true);
  const [ending, setEnding] = useState(false);

  const { play, threeD, meteor, objet, setPlay, setThreeD, setObjet, setAudio } =
    useModernMoveContext();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const monitorRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handlePlayClick = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.muted = false;
    audioRef.current
      .play()
      .then(() => {
        setPlay(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMeteorClick = () => {
    meteor.current = true;
    const timer = setTimeout(() => {
      meteor.current = false;
      clearTimeout(timer);
    }, 2500);
  };

  const handleObjetClick = () => {
    if (play) {
      setObjet(true);
      const timer = setTimeout(() => {
        setObjet(false);
        clearTimeout(timer);
      }, 2500);
    }
  };

  const handlePauseClick = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlay(false);
  };

  const handleThreeDClick = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;
    audioRef.current.muted = false;
    audioRef.current
      .play()
      .then(() => {
        setPlay(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setThreeD(!threeD);
  };

  const handleHomeClick = () => router.push('/tests');

  const handleEnding = () => {
    console.log('ended!');
    const timer = setTimeout(() => {
      setEnding(true);
      clearTimeout(timer);
    }, 3000);
  };

  useEffect(() => {
    /** ============ set screensize =============== */
    const setScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setInnerW(window.innerWidth);
    setAwaiting(false);
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
    if (audioRef.current) {
      setAudio(audioRef.current);
    }
  }, [setAudio]);

  console.log('canvas 1 render');

  return (
    <>
      <audio ref={audioRef} src="/assets/modernmove/modernmove.mp3" muted onEnded={handleEnding} />
      <Suspense fallback={<MoonLoaderBlack />}>
        <div ref={monitorRef} className={styles.monitortop}>
          <Landscape />

          <div className={styles.monitorbox}>
            <div className={styles.monitortopvoid}></div>

            <div className={styles.monitorcanvasbox}>
              {innerW && !ending ? (
                <VaporwaveScene />
              ) : (
                <div className={styles.mmloader}>
                  <MmLoader />
                </div>
              )}
            </div>

            <div className={styles.monitorbottombox}>
              <div className={styles.monitorhomebox}>
                <div id="voidhomebtn" className={styles.monitorhomeboxinner}>
                  {!objet ? (
                    <img
                      className={styles.homebtnvankoimg}
                      src="/assets/modernmove/gamegi_vanko.webp"
                      alt="vanko01"
                      onClick={handleObjetClick}
                    />
                  ) : (
                    <img
                      className={styles.homebtnvankoimg}
                      src="/assets/modernmove/gamegi_vankowow.webp"
                      alt="vanko02"
                    />
                  )}
                  <img
                    className={styles.homebtnbackimg}
                    src="/assets/modernmove/gamegibtn-big.webp"
                    alt="gamegi_home_box"
                  />
                </div>
              </div>

              <div className={styles.monitorbottombtngrid}>
                <div style={{ display: 'grid' }}>
                  {!play ? (
                    <img
                      id="play"
                      className={styles.gamegibtn}
                      style={{
                        position: 'relative',
                        height: 'auto',
                        zIndex: '6',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        pointerEvents: awaiting ? 'none' : 'all',
                      }}
                      src="/assets/modernmove/gamegi-playbtn.webp"
                      alt="gamegi_play"
                      onClick={handlePlayClick}
                    />
                  ) : (
                    <img
                      id="pause"
                      className={styles.gamegibtn}
                      style={{
                        position: 'relative',
                        height: 'auto',
                        zIndex: '6',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                      }}
                      src="/assets/modernmove/gamegi-pausebtn.webp"
                      alt="gamegi_pause"
                      onClick={handlePauseClick}
                    />
                  )}
                </div>
                <div style={{ display: 'grid' }}>
                  <img
                    id="star"
                    className={styles.gamegibtntop}
                    style={{
                      position: 'relative',
                      height: 'auto',
                      zIndex: '6',
                      boxSizing: 'border-box',
                      pointerEvents: awaiting ? 'none' : 'all',
                    }}
                    src="/assets/modernmove/gamegi-starbtn.webp"
                    alt="gamegi_star"
                    onClick={handleMeteorClick}
                  />
                </div>
                <div style={{ display: 'grid' }}>
                  <img
                    id="threed"
                    className={styles.gamegibtn}
                    style={{
                      position: 'relative',
                      height: 'auto',
                      zIndex: '6',
                      boxSizing: 'border-box',
                      pointerEvents: awaiting ? 'none' : 'all',
                    }}
                    src="/assets/modernmove/gamegi-homebtn.webp"
                    alt="gamegi_home"
                    onClick={handleHomeClick}
                  />
                </div>
                <div style={{ display: 'grid' }}>
                  {threeD ? (
                    <img
                      id="threed"
                      className={styles.gamegibtntop}
                      style={{
                        position: 'relative',
                        height: 'auto',
                        zIndex: '6',
                        boxSizing: 'border-box',
                        pointerEvents: awaiting ? 'none' : 'all',
                      }}
                      src="/assets/modernmove/gamegi-3dbtn.webp"
                      alt="gamegi_3d"
                      onClick={handleThreeDClick}
                    />
                  ) : (
                    <img
                      className={styles.gamegibtntop}
                      style={{
                        position: 'relative',
                        height: 'auto',
                        zIndex: '6',
                        boxSizing: 'border-box',
                      }}
                      src="/assets/modernmove/gamegi-2dbtn.webp"
                      alt="gamegi_2d"
                      onClick={handleThreeDClick}
                    />
                  )}
                </div>

                <div></div>
                <div></div>
              </div>
            </div>

            <Image
              style={{ pointerEvents: 'none' }}
              src={'/assets/modernmove/newgamegibody.webp'}
              alt="gamegi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1600px) 36rem, (max-width: 1920px) 36rem, 36rem"
            />
          </div>

          <div
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: '0',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: '20rem',
                backgroundRepeat: 'repeat',
                backgroundImage: 'url(/assets/modernmove/modernback.png)',
              }}
            ></div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
