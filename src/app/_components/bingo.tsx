"use client";

import React from "react";
import Playfield from "./playfield";
import ModalDialog from "./modalDialog";

export default function Bingo() {
  const numberOfColumns = 5;

  const [bingoEntries, setBingoEntries] = React.useState<string[]>([]);
  const [entryInput, setEntryInput] = React.useState("");
  const [playfieldEntries, setPlayfieldEntries] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const inputValidationAndTrim = (entryInput: string): string => {
    const trimmedEntryInput = entryInput.trim();
    return trimmedEntryInput;
  };

  const addEntry = () => {
    const trimmedEntryInput = inputValidationAndTrim(entryInput);

    if (trimmedEntryInput.length > 24) {
      setError("Entry is too long. Try a shorter one!");
      setIsModalOpen(true);
      return;
    } else if (trimmedEntryInput.length < 4) {
      setError("Entry is too short. Try a shorter one!");
      setIsModalOpen(true);
      return;
    } else if (bingoEntries.length === 24) {
      setError("List full! - You can start your game");
      setIsModalOpen(true);
      return;
    } else {
      setError(null);
    }

    setBingoEntries([...bingoEntries, trimmedEntryInput]);
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

      {isModalOpen && (
        <ModalDialog
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title="Error"
          text={error ?? ""}
          buttonText="OKAY"
        />
      )}
    </>
  );
}
