import LetteringSvg from "@/public/lettering.svg";
import React from "react";

interface LetteringProperties {
  width?: string;
  className?: string;
}

const Lettering: React.FC<LetteringProperties> = ({
  width = "12rem",
  className,
}) => {
  const numerizedWidth = parseFloat(width);
  const ratioFactor = 0.4295774647887324; // Ratio of original SVG
  const calculatedHeight = numerizedWidth * ratioFactor;
  return (
    <LetteringSvg
      width={width}
      height={`${calculatedHeight}rem`}
      className={className}
    />
  );
};

export default Lettering;
