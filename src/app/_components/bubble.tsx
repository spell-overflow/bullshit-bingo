import BubbleSvg from "@/public/bubble.svg";

interface BubbleProperties {
  width?: string;
  className?: string;
}

const Bubble: React.FC<BubbleProperties> = ({ width = "3rem", className }) => {
  const numerizedWidth = parseFloat(width);
  const ratioFactor = 1.053846153846154; // Ratio of original SVG
  const calculatedHeight = numerizedWidth * ratioFactor;
  return (
    <>
      <BubbleSvg
        width={width}
        height={`${calculatedHeight}rem`}
        className={className}
      />
    </>
  );
};

export default Bubble;
