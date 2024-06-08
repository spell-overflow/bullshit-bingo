"use client";

import { useEffect, useState } from "react";

export default function Playfield({
  entries,
}: {
  entries: string[];
}): JSX.Element {
  const [playfield, setPlayfield] = useState<string[]>([]);

  useEffect(() => {
    const newPlayfield: string[] = [];

    // initilize playfield
    for (let i = 0; i < 25; i++) {
      const entry = entries[i];

      newPlayfield.push(entry ?? "");
    }

    setPlayfield(newPlayfield);
  }, [entries]);

  return (
    <div className="grid grid-cols-5 gap-5">
      {playfield.map((e, i) => (
        <PlayfieldElement
          key={i}
          entry={e}
          onChange={(state) => console.log(`${i} has changed to ${state}`)}
        />
      ))}
    </div>
  );
}

function PlayfieldElement({
  entry,
  onChange,
}: {
  entry: string;
  onChange: (state: boolean) => void;
}): JSX.Element {
  const [isDone, setIsDone] = useState(false);

  return (
    <div
      className="relative h-24 w-24 overflow-hidden text-ellipsis rounded-xl bg-indigo-800 p-3 shadow-md"
      onClick={() => {
        onChange(!isDone);
        setIsDone(!isDone);
      }}
    >
      {entry}
      {isDone ? (
        <>
          <div className="absolute -left-12 top-12 h-1 w-48 rotate-45 bg-gray-500/50"></div>
          <div className="absolute -left-12 top-12 h-1 w-48 -rotate-45 bg-gray-500/50"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
