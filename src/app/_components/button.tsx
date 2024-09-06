type ButtonProperties = {
  buttonText: string;
  buttonType: "prim" | "sec";
  onClick: () => void;
};

export default function Button({
  buttonText,
  buttonType,
  onClick,
}: ButtonProperties) {
  const btnClass =
    buttonType === "prim"
      ? "bg-curious-blue-500 hover:bg-curious-blue-600"
      : "bg-curious-blue-700 hover:bg-curious-blue-800";

  return (
    <>
      <button
        type="button"
        className={`rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ${btnClass}`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
