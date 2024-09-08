"use client";

import React from "react";
import Playfield from "./playfield";
import ModalDialog from "./modalDialog";
import Button from "./button";
import Input from "./input";

export default function Bingo() {
  const numberOfColumns = 5;

  const [bingoEntries, setBingoEntries] = React.useState<string[]>([
    "Wand",
    "Cauldron",
    "Curse",
    "Transformation",
    "Witch Hat",
    "Broomstick",
    "Spell",
    "Potion",
    "Sorcery",
    "Coven",
  ]);
  const [entryInput, setEntryInput] = React.useState("");
  const [playfieldEntries, setPlayfieldEntries] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [icon, setIcon] = React.useState<string | null>(null);

  const inputValidationAndTrim = (entryInput: string): string => {
    const trimmedEntryInput = entryInput.trim();
    return trimmedEntryInput;
  };

  const addEntry = () => {
    const trimmedEntryInput = inputValidationAndTrim(entryInput);

    if (trimmedEntryInput.length > 24) {
      setError("Entry is too long. Try a shorter one!");
      setIcon("error");
      setIsModalOpen(true);
      return;
    } else if (trimmedEntryInput.length < 3) {
      setError("Entry is too short. Try a longer one!");
      setIcon("error");
      setIsModalOpen(true);
      return;
    } else if (bingoEntries.length === 24) {
      setError("List full! - You can start your game");
      setIcon("error");
      setIsModalOpen(true);
      return;
    } else if (bingoEntries.find((entry) => entry === trimmedEntryInput)) {
      setError("Entry already exists.");
      setIcon("error");
      setIsModalOpen(true);
      setEntryInput("");
      return;
    } else {
      setError(null);
    }

    setBingoEntries([...bingoEntries, trimmedEntryInput]);
    setEntryInput("");
  };

  const handleAddEntry = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEntryInput(event.target.value);
  };

  return (
    <>
      <h1 className="p-8 text-4xl text-curious-blue-950">Bingo</h1>
      <div className="flex h-[561px] items-stretch space-x-5 text-center">
        <div className="h-full flex-auto text-curious-blue-200">
          <Playfield
            numberOfColumns={numberOfColumns}
            entries={playfieldEntries.map((entry) => ({
              text: entry,
              crossed: false,
            }))}
          />
        </div>

        <div className="mb-4 flex h-full flex-col overflow-y-auto rounded-lg bg-curious-blue-300 p-2 shadow-md">
          <div className="mb-2 flex items-center ">
            <Input
              label="your task"
              type="text"
              placeholder="your task"
              onChange={handleInputChange}
              value={entryInput}
              onKeyDown={handleAddEntry}
            ></Input>
            <Button
              buttonText="add"
              buttonType="prim"
              additionalClasses=""
              onClick={addEntry}
            ></Button>
          </div>

          <div className=" scrollbar-track-curious-blue-500 scrollbar-thumb-curious-blue-800 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded-full flex-1 overflow-y-auto">
            <ul>
              {bingoEntries.map((entry) => (
                <li
                  key={entry}
                  className=" mb-2 flex items-center justify-between"
                >
                  <span>{entry}</span>
                  <Button
                    buttonText="remove"
                    buttonType="prim"
                    additionalClasses=""
                    onClick={() => handleRemoveItem(entry)}
                  ></Button>
                </li>
              ))}

              <Button
                buttonText="fill playfield"
                buttonType="sec"
                additionalClasses=""
                onClick={handleFillPlayfield}
              ></Button>
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalDialog
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title="Error"
          text={error ?? ""}
          buttonText="OKAY"
          icon={icon}
        />
      )}
    </>
  );
}
