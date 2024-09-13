import React from "react";
import Confetti from "react-confetti";
import { useEffect } from "react";
import useWindowSize from "~/helper/useWindowSize";

interface ConfettiComponentProperties {
  celebrate: boolean;
  setCelebrate: (celebrate: boolean) => void;
}

const ConfettiComponent: React.FC<ConfettiComponentProperties> = ({
  celebrate,
  setCelebrate,
}) => {
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

      const recycleTime = setTimeout(() => {
        setRecycle(false);
      }, 5000);

      const partytime = setTimeout(() => {
        setCelebrate(false);
      }, 10000);

      return () => {
        clearTimeout(recycleTime);
        clearTimeout(partytime);
      };
    }
  }, [celebrate, setCelebrate]);

  return celebrate ? (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={800}
      ref={canvasRef}
      recycle={recycle}
    />
  ) : null;
};

export default ConfettiComponent;
