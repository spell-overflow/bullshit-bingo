"use client";

export default function Playfield({
  entries,
}: {
  entries: string[];
}): JSX.Element {
  const playfield: JSX.Element[] = [];

  // initilize playfield
  for (let i = 0; i < 25; i++) {
    const entry = entries[i];

    playfield.push(
      <div
        key={i}
        className="h-24 w-24 overflow-hidden text-ellipsis rounded-xl bg-indigo-800 p-3 shadow-md"
      >
        {entry ? entry : 0}
      </div>,
    );
  }

  return <div className="grid grid-cols-5 gap-5">{playfield}</div>;
}

// <tag prop1="" prop2="">Inhalt</tag>
