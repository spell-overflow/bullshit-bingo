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

  useEffect(() => {
    if (celebrate) {
      const partytime = setTimeout(() => {
        setCelebrate(false);
      }, 10000);

      return () => clearTimeout(partytime);
    }
  }, [celebrate, setCelebrate]);

  return celebrate ? (
    <Confetti width={width} height={height} numberOfPieces={800} />
  ) : null;
};

export default ConfettiComponent;
