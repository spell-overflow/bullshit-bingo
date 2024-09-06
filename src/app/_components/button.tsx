type ButtonProperties = {
  buttonText: string;
  buttonType: "prim" | "sec";
  additionalClasses: string;
  onClick: () => void;
};

export default function Button({
  buttonText,
  buttonType,
  additionalClasses,
  onClick,
}: ButtonProperties) {
  const btnClass =
    buttonType === "prim"
      ? "bg-curious-blue-500 hover:bg-curious-blue-600 text-curious-blue-950"
      : "bg-curious-blue-700 hover:bg-curious-blue-800 text-curious-blue-100";

  return (
    <>
      <button
        type="button"
        className={`m-2 h-8 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-md ${additionalClasses} ${btnClass}`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
