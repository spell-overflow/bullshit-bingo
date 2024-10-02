"use client";

import Confetti from "react-confetti";
import React, { useEffect } from "react";
import useWindowSize from "~/helper/useWindowSize";
import { useCelebrateStore } from "../store";

const ConfettiComponent: React.FC = () => {
  const { celebrate, setCelebrate } = useCelebrateStore();
  const { width, height } = useWindowSize();
  const [recycle, setRecycle] = React.useState(true);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (celebrate) {
      setRecycle(true);
      const currentRef = canvasRef.current;
      if (currentRef) {
        currentRef.style.zIndex = "100";
      }

      const recycletime = setTimeout(() => {
        setRecycle(false);
      }, 5000);

      const partytime = setTimeout(() => {
        setCelebrate(false);
      }, 10000);

      return () => {
        clearTimeout(partytime);
        clearTimeout(recycletime);
      };
    }
  }, [celebrate, setCelebrate]);

  return celebrate ? (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={1500}
      ref={canvasRef}
      recycle={recycle}
    />
  ) : null;
};

export default ConfettiComponent;
