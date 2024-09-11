import React from "react";
import classNames from "~/helper/classnames";

type inputProperties = {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input: React.FC<inputProperties> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
}) => {
  return (
    <input
      id={type}
      name={type}
      type={type}
      value={value}
      placeholder={placeholder}
      className={classNames(
        "focus:ring-inset focus:ring-curious-blue-500",
        "h-8 rounded-md border-0 py-1.5 text-gray-900 shadow-lg placeholder:text-gray-400 sm:text-sm sm:leading-6",
        className,
      )}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
