import Image from "next/image";

const Bubble = () => {
  return (
    <div className="flex flex-row items-center">
      <Image src="/speechbubble.png" alt="Logo" width={300} height={50} />
    </div>
  );
};

export default Bubble;
