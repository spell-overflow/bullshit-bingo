import React from "react";

interface ContainerProperties {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProperties> = ({ className, children }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      <div
        className={`${className} mx-auto flex w-4/5 justify-center rounded-lg bg-card p-2 shadow-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
