import Image from "next/image";

const FullLogo = () => {
  return (
    <header>
      <Image
        src="/speechbubble+AppName.png"
        alt="Logo"
        width={300}
        height={50}
      />
    </header>
  );
};

export default FullLogo;
