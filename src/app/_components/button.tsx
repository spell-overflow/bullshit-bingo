import React from "react";
import classNames from "~/helper/classnames";

type ButtonProperties = {
  buttonType?: "prim" | "sec";
  className?: string;
  onClick: () => void;
  children?: React.ReactNode;
};

export default function Button({
  buttonType = "prim",
  className,
  onClick,
  children,
}: ButtonProperties) {
  return (
    <>
      <button
        type="button"
        className={classNames(
          buttonType === "prim"
            ? "bg-curious-blue-500 text-curious-blue-950 hover:bg-curious-blue-600"
            : "bg-curious-blue-700 text-curious-blue-100 hover:bg-curious-blue-800",
          `h-8 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-md`,
          className,
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
