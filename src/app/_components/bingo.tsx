"use client";

import React from "react";
import Playfield from "./playfield";

export default function Bingo() {
  const [bingoEntries, setBingoEntries] = React.useState<string[]>([]);
  const [entryInput, setEntryInput] = React.useState("");

  const addEntry = () => {
    setBingoEntries([...bingoEntries, entryInput]);
    setEntryInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addEntry();
    }
  };

  return (
    <>
      <h1 className="p-8 text-4xl text-indigo-600">Bingo</h1>
      <div className="flex space-x-5 text-center">
        <div className="flex-auto text-indigo-200">
          <Playfield entries={bingoEntries} />
        </div>
        <div className="flex-auto rounded bg-indigo-800 p-2">
          <input
            className="m-2 rounded bg-indigo-200 p-1 text-black shadow"
            onChange={(e) => {
              setEntryInput(e.target.value);
            }}
            value={entryInput}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addEntry}
            className="m-2 rounded bg-indigo-950 p-1 text-indigo-200"
          >
            add
          </button>
        </div>
      </div>
    </>
  );
}
