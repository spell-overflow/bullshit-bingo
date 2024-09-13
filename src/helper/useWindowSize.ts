import { useState, useEffect } from "react";

const useWindowSize = (_initialWidth = Infinity, _initialHeight = Infinity) => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleSizeChange() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleSizeChange);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  });
  return windowSize;
};

export default useWindowSize;
