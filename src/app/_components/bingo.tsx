"use client";

import React from "react";
import Playfield from "./playfield";
import ModalDialog from "./modalDialog";
import Button from "./button";

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

  const handleRemoveItem = (entry: string) => {
    // remove item
    setBingoEntries(bingoEntries.filter((item) => item !== entry));
    console.log(`remove item`);
  };

  const handleFillPlayfield = () => {
    const playfieldSize = numberOfColumns * numberOfColumns;
    const entries: string[] = [];
    for (let i = 0; i < playfieldSize; i++) {
      const randomNumber = Math.round(
        Math.random() * (bingoEntries.length - 1),
      );
      entries.push(bingoEntries[randomNumber] ?? "");
    }
    setPlayfieldEntries(entries);
  };
  return (
    <>
      <h1 className="text-curious-blue-200 p-8 text-4xl">Bingo</h1>
      <div className="flex space-x-5 text-center">
        <div className="text-curious-blue-200 flex-auto">
          <Playfield
            numberOfColumns={numberOfColumns}
            entries={playfieldEntries.map((entry) => ({
              text: entry,
              crossed: false,
            }))}
          />
        </div>
        <div className="bg-curious-blue-300 flex-auto  p-2">
          <input
            className="bg-curious-blue-200 m-2 h-8 rounded p-1 text-indigo-950 shadow"
            onChange={(e) => {
              e.preventDefault();
              setEntryInput(e.target.value);
            }}
            value={entryInput}
            onKeyDown={handleKeyDown}
          />
          <Button
            buttonText="add"
            buttonType="prim"
            onClick={addEntry}
          ></Button>
          <Button
            buttonText="fill playfield"
            buttonType="sec"
            onClick={handleFillPlayfield}
          ></Button>
          <ul>
            {bingoEntries.map((entry) => (
              <li
                key={entry}
                className="bg-curious-blue-500 flex items-center justify-between py-1"
              >
                <span>{entry}</span>
                <button
                  type="button"
                  className="bg-curious-blue-950 text-curious-blue-200 m-2 h-8 rounded p-1 shadow"
                  onClick={() => handleRemoveItem(entry)}
                >
                  remove item
                </button>
              </li>
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
