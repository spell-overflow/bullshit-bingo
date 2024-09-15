import { useState, useEffect } from "react";

const useWindowSize = (_initialWidth = Infinity, _initialHeight = Infinity) => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : _initialWidth,
    height: typeof window !== "undefined" ? window.innerHeight : _initialHeight,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

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
