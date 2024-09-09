"use client";

import React from "react";
import Playfield from "./playfield";
import ModalDialog from "./modalDialog";
import type { iconType } from "./modalDialog";
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
  const [error, setError] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [icon, setIcon] = React.useState<iconType>(null);

  const addEntry = () => {
    const trimmedEntryInput = entryInput.trim();

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
    }

    setBingoEntries([...bingoEntries, trimmedEntryInput]);
    setEntryInput("");
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
      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="overflow-visible">
                <Playfield
                  numberOfColumns={numberOfColumns}
                  entries={playfieldEntries.map((entry) => ({
                    text: entry,
                    crossed: false,
                  }))}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[35rem] overflow-hidden rounded-lg bg-curious-blue-300 shadow">
                <div className="p-6">
                  <div className="mb-2 flex gap-2">
                    <div className="col-span-2 flex-1 basis-3/4">
                      <Input
                        type="text"
                        placeholder="your task"
                        onChange={handleInputChange}
                        value={entryInput}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            addEntry();
                          }
                        }}
                        className="w-full"
                      />
                    </div>

                    <Button onClick={addEntry} className="flex-1 basis-1/4">
                      add
                    </Button>
                  </div>

                  <div className="mb-2 box-content h-[27rem] overflow-y-scroll">
                    {/*scrollbar-thumb-rounded-full scrollbar-thumb-rounded scrollbar-track-rounded-full scrollbar-thin scrollbar-track-curious-blue-500 scrollbar-thumb-curious-blue-800*/}
                    <ul>
                      {bingoEntries.map((entry) => (
                        <li key={entry} className="mb-2 flex items-center">
                          <div className="flex-grow">{entry}</div>
                          <div>
                            <Button
                              onClick={() =>
                                setBingoEntries(
                                  bingoEntries.filter((item) => item !== entry),
                                )
                              }
                            >
                              X
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    buttonType="sec"
                    onClick={handleFillPlayfield}
                    className="w-full"
                  >
                    fill playfield
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Error"
        text={error}
        buttonText="OKAY"
        icon={icon}
      />
    </>
  );
}
