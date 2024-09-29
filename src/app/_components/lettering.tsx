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
  return (
    <LetteringSvg /* width={width} */ width={width} className={className} />
  );
};

export default Lettering;
