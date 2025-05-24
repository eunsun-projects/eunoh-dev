"use client";

import { useEffect, useState } from "react";
import styles from "../_styles/soundfx.module.css";
import type { FxObj } from "./Fxsample";

interface FilterProps {
  context: AudioContext;
  fxObj: FxObj;
}

export default function Filter({ context, fxObj }: FilterProps) {
  const [filterSet, setFilterSet] = useState<BiquadFilterNode | null>(null);
  const [checked, setChecked] = useState(false);
  const [valueF, setValueF] = useState(1);
  const [valueQ, setValueQ] = useState(0);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (e.currentTarget.checked) {
      if (fxObj.isPlaying) {
        const filter = context.createBiquadFilter();

        fxObj.currSource?.connect(filter);

        if (fxObj.volControlGainNode) {
          filter.connect(fxObj.volControlGainNode);
          filter.frequency.value = 5000;
          filter.gain.value = 1;
        }
        filter.Q.value = 0.5;

        setFilterSet(filter);
      }
    } else {
      if (filterSet) {
        filterSet.disconnect(0);
      }
    }
  };

  const handleChangeF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueF(Number(e.currentTarget.value));
    if (filterSet !== null) {
      const minValue = 40;
      const maxValue = context.sampleRate / 2;
      const numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
      // biome-ignore lint/style/useExponentiationOperator: <explanation>
      const multiplier = Math.pow(
        2,
        numberOfOctaves * (Number(e.currentTarget.value) - 1.0),
      );
      filterSet.frequency.value = maxValue * multiplier;
    }
  };

  const handleChangeQ = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueQ(Number(e.currentTarget.value));
    if (filterSet) {
      const qualityMultify = 30;
      filterSet.Q.value = Number(e.currentTarget.value) * qualityMultify;
    }
  };

  //추가할것 : enable 체크 된 상태면 곡이 바뀌어도 바뀐 곡에 자동 필터 적용할 것
  useEffect(() => {
    // console.log(fxObj)
    if (fxObj.currSource !== null && fxObj.currSource !== undefined) {
      if (filterSet !== null) {
        fxObj.currSource.connect(filterSet);
      }
    }
  }, [fxObj.currSource, filterSet]);

  return (
    <div className={styles.webapbox}>
      <p style={{ fontSize: "1.2rem" }}>filter</p>
      <div className={styles.webapfilter}>
        <input
          type="checkbox"
          id="c1"
          checked={checked}
          onChange={handleCheckChange}
        />
        <label htmlFor="c1">
          <span>Enable filter</span>
        </label>
      </div>

      <div className={styles.webapfilterbtn}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={valueF}
          onChange={handleChangeF}
        />
        <span>Frequency</span>
      </div>
      <div className={styles.webapfilterbtn}>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.02}
          value={valueQ}
          onChange={handleChangeQ}
        />
        <span>Q</span>
      </div>
    </div>
  );
}
