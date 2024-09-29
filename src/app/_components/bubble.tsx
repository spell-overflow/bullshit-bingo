import BubbleSvg from "@/public/bubble.svg";

interface BubbleProperties {
  width?: string;
  className?: string;
}

const Bubble: React.FC<BubbleProperties> = ({ width = "3rem", className }) => {
  return (
    <>
      <BubbleSvg width={width} className={className} />
    </>
  );
};

export default Bubble;
