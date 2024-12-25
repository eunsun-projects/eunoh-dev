'use client';

import { useEffect, useRef } from 'react';
import styles from '../_styles/soundfx.module.css';
import { FxObj } from './Fxsample';

interface VisualizerProps {
  context: AudioContext;
  fxObj: FxObj;
}

const SMOOTHING = 0.8;
const FFT_SIZE = 2048;
const HEIGHT = 120; //360
const WIDTH = 480; //640

export default function Visualizer({ context, fxObj }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (fxObj.currSource !== null && fxObj.currSource !== undefined) {
      const analyser = context.createAnalyser();

      const freqs = new Uint8Array(analyser.frequencyBinCount);
      const times = new Uint8Array(analyser.frequencyBinCount);

      analyser.connect(context.destination);
      analyser.minDecibels = -140;
      analyser.maxDecibels = 0;

      if (fxObj.isPlaying) {
        fxObj.startTime = context.currentTime;
        console.log('started at', fxObj.offsetTime);

        // Connect graph
        fxObj.currSource.connect(analyser);

        draw();

        function draw() {
          if (!canvasRef.current) return;
          const canvas = canvasRef.current;
          const drawContext = canvas.getContext('2d');
          if (!drawContext) return;
          drawContext.clearRect(0, 0, WIDTH, HEIGHT);

          analyser.smoothingTimeConstant = SMOOTHING;
          analyser.fftSize = FFT_SIZE;

          // Get the frequency data from the currently playing music
          analyser.getByteFrequencyData(freqs);
          analyser.getByteTimeDomainData(times);

          const width = Math.floor(1 / freqs.length);

          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          // Draw the frequency domain chart.
          for (let i = 0; i < analyser.frequencyBinCount; i++) {
            const value = freqs[i];
            const percent = value / 256;
            const height = HEIGHT * percent;
            const offset = HEIGHT - height - 1;
            const barWidth = WIDTH / analyser.frequencyBinCount;
            const hue = (i / analyser.frequencyBinCount) * 360;
            drawContext.fillStyle = 'white'; //'hsl(' + hue + ', 100%, 50%)'
            drawContext.globalAlpha = 1.0;
            drawContext.fillRect(i * barWidth, offset, 1, height); // i * barWidth, offset, barWidth, height
          }

          // Draw the time domain chart.
          for (let i = 0; i < analyser.frequencyBinCount; i++) {
            const value = times[i];
            const percent = value / 256;
            const height = HEIGHT * percent;
            const offset = HEIGHT - height - 1;
            const barWidth = WIDTH / analyser.frequencyBinCount;
            drawContext.fillStyle = 'white';
            drawContext.fillRect(i * barWidth, offset, 1, 2);
          }

          requestAnimationFrame(draw);
        }
      } else {
        console.log('paused at', fxObj.offsetTime);
      }
    }
  }, [fxObj.currBuffer, fxObj.isPlaying, context, fxObj]);

  return (
    <div className={styles.webapbox}>
      <p style={{ fontSize: '1.2rem' }}>visualizer</p>
      <canvas className={styles.webapcanvas} ref={canvasRef}></canvas>
    </div>
  );
}
