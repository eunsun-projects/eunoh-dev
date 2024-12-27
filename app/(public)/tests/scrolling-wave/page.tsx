'use client';

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCallback, useState } from 'react';

const X_LINES = 40;

const PAGE_COUNT = 5;

const INITIAL_WIDTH = 20;

function ScrollingWavePage() {
  const { scrollYProgress } = useScroll();

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['circle(0% at 50% 50%)', 'circle(100% at 50% 50%)'],
  );
  const textValue = useSpring(0, { bounce: 0.1 });

  const calculateWidth = useCallback((where: 'left' | 'right', scrollP: number) => {
    return Array.from({ length: X_LINES }).map((_, i) => {
      const percentilePosition = where === 'left' ? 1 - (i + 1) / X_LINES : (i + 1) / X_LINES;
      return (
        INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - scrollP) * Math.PI) / 1.5) ** 32
      );
    });
  }, []);

  const [leftVarWidths, setLeftVarWidths] = useState<number[]>(calculateWidth('left', 0));
  const [rightVarWidths, setRightVarWidths] = useState<number[]>(calculateWidth('right', 0));

  useMotionValueEvent(scrollYProgress, 'change', (scrollP) => {
    setLeftVarWidths(calculateWidth('left', scrollP));
    setRightVarWidths(calculateWidth('right', scrollP));
    if (scrollP > 0.7) {
      textValue.set(0);
    } else {
      textValue.set(300);
    }
  });

  return (
    <>
      <div className="w-full h-full fixed flex inset-0 pointer-events-none z-10">
        <motion.div className="w-full h-full flex flex-col items-start z-10 justify-between">
          {leftVarWidths.map((width, i) => (
            <motion.div
              key={i}
              className="h-[1vh] bg-slate-300"
              style={{
                width,
              }}
            />
          ))}
        </motion.div>
        <motion.div className="w-full h-full flex flex-col items-end z-10 justify-between">
          {rightVarWidths.map((width, i) => (
            <motion.div
              key={i}
              className="h-[1vh] bg-slate-300"
              style={{
                width,
              }}
            />
          ))}
        </motion.div>
      </div>
      <motion.div className="bg-orange-400 fixed top-0 left-0 w-full h-full" style={{ clipPath }}>
        <h1 className="text-blue-600 font-bold text-[8vw] pl-[8vw]">
          <span className="block overflow-hidden">
            <motion.span className="block" style={{ y: textValue }}>
              Aha!
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" style={{ y: textValue }}>
              You found me!
            </motion.span>
          </span>
        </h1>
      </motion.div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className="h-dvh w-dvw bg-gray-700" key={index} />
      ))}
    </>
  );
}

export default ScrollingWavePage;
