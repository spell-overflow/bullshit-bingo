import Image from "next/image";

const Lettering = () => {
  return (
    <div className="flex flex-row items-center">
      <Image src="/appName.png" alt="Logo" width={300} height={50} />
    </div>
  );
};

export default Lettering;
