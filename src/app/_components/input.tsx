import React from "react";

type inputProperties = {
  label: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<inputProperties> = ({
  label = "Input",
  type = "text",
  placeholder = "placeholder",
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <div>
      <label htmlFor={type} className="sr-only">
        {label}
      </label>
      <input
        id={type}
        name={type}
        type={type}
        value={value}
        placeholder={placeholder}
        className="ring-curious-blue-50-300 focus:ring-curious-blue-500 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;
