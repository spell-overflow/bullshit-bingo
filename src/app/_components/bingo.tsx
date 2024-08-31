"use client";

import React from "react";
import Playfield from "./playfield";

export default function Bingo() {
  const numberOfColumns = 5;

  const [bingoEntries, setBingoEntries] = React.useState<string[]>([]);
  const [entryInput, setEntryInput] = React.useState("");
  const [playfieldEntries, setPlayfieldEntries] = React.useState<string[]>([]);

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
      <h1 className="p-8 text-4xl text-gray-200">Bingo</h1>
      <div className="flex space-x-5 text-center">
        <div className="flex-auto text-gray-200">
          <Playfield
            numberOfColumns={numberOfColumns}
            entries={playfieldEntries.map((entry) => ({
              text: entry,
              crossed: false,
            }))}
          />
        </div>
        <div className="flex-auto rounded bg-indigo-800 p-2">
          <input
            className="m-2 h-8 rounded bg-gray-200 p-1 text-indigo-950 shadow"
            onChange={(e) => {
              e.preventDefault();
              setEntryInput(e.target.value);
            }}
            value={entryInput}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addEntry}
            className="m-2 h-8 rounded bg-indigo-950 p-1 text-indigo-200 shadow"
          >
            add
          </button>
          <button
            onClick={() => {
              const playfieldSize = numberOfColumns * numberOfColumns;
              const entries: string[] = [];
              for (let i = 0; i < playfieldSize; i++) {
                const randomNumber = Math.round(
                  Math.random() * (bingoEntries.length - 1),
                );
                entries.push(bingoEntries[randomNumber] ?? "");
              }
              setPlayfieldEntries(entries);
            }}
            className="m-2 h-8 rounded bg-indigo-950 p-1 text-indigo-200 shadow"
          >
            fill playfield
          </button>
          <ul>
            {bingoEntries.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
