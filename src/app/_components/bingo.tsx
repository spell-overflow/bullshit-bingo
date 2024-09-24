"use client";

import React from "react";
import Playfield from "./playfield";
import type { FieldObject } from "./playfield";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-regular-svg-icons/faArrowRightFromBracket";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons/faCircleXmark";
import Lettering from "./lettering";
import Bubble from "./bubble";
import { Input } from "~/components/ui/input";
import DialogWindow from "./dialogWindow";
import { faBomb } from "@fortawesome/pro-regular-svg-icons";
import DarkMode from "./darkmode";

export default function Bingo() {
  const numberOfColumns = 5;

  const { data: session } = useSession();
  const tasks = api.bingo.getTasks.useQuery();
  const addTask = api.bingo.addTask.useMutation();
  const deleteTask = api.bingo.deleteTask.useMutation();
  const playfield = api.bingo.getPlayfield.useQuery();
  const createPlayfield = api.bingo.createPlayfield.useMutation();

  const bingoEntries = tasks.status === "success" ? tasks.data : [];

  const [entryInput, setEntryInput] = React.useState("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const addEntry = () => {
    const trimmedEntryInput = entryInput.trim();

    if (trimmedEntryInput.length > 24) {
      setError("Entry is too long. Try a shorter one!");
      setOpen(true);
      return;
    } else if (trimmedEntryInput.length < 3) {
      setError("Entry is too short. Try a longer one!");
      setOpen(true);
      return;
    } else if (bingoEntries.length === 24) {
      setError("List full! - You can start your game");
      setOpen(true);
      return;
    } else if (bingoEntries.find((entry) => entry.text === trimmedEntryInput)) {
      setError("Entry already exists.");
      setOpen(true);
      setEntryInput("");
      return;
    }

    addTask
      .mutateAsync(trimmedEntryInput)
      .then(() => {
        tasks
          .refetch()
          .then(() => {
            setEntryInput("");
          })
          .catch((e) => console.error(e)); //TODO: improve error handling
      })
      .catch((e) => console.error(e)); //TODO: improve error handling
  };

  const handleFillPlayfield = () => {
    const playfieldSize = numberOfColumns * numberOfColumns;
    const entries: string[] = [];
    for (let i = 0; i < playfieldSize; i++) {
      const randomNumber = Math.round(
        Math.random() * (bingoEntries.length - 1),
      );
      entries.push(bingoEntries[randomNumber]?.text ?? "");
    }
    createPlayfield
      .mutateAsync(entries)
      .then(() => {
        playfield.refetch().catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
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
            {/* Header with Logo */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="w-full text-center">
                <div className="inline-block align-middle">
                  <Lettering />
                </div>
                <div className="inline-block align-middle">
                  <Bubble />
                </div>
              </div>
            </div>

            {/* Avatar  */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between rounded-bl-lg rounded-br-lg bg-accent p-4 text-right align-middle text-lg shadow">
                <span className="block max-w-40 overflow-hidden text-ellipsis">
                  {session?.user.name}
                </span>
                <Avatar className="block">
                  <AvatarImage
                    src={session?.user.image ?? undefined}
                    alt="user avatar"
                  />
                  <AvatarFallback className="bg-primary">
                    {session?.user.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DarkMode />
                </div>
                <Button
                  className="block"
                  variant="ghost"
                  size={"icon"}
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                </Button>
              </div>
            </div>

            {/* Playfield - Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="text-center">
                <Playfield
                  numberOfColumns={numberOfColumns}
                  entries={
                    playfield.data?.map((entry) => ({
                      text: entry.playfieldentry?.text ?? "",
                      crossed: entry.playfieldentry?.isCrossed ?? false,
                    })) ?? ([] as FieldObject[])
                  }
                />
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 grid h-[35rem] overflow-hidden rounded-lg bg-accent text-accent-foreground shadow">
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
                        className="col-span-3 grid w-full"
                      />
                    </div>
                    <Button
                      onClick={addEntry}
                      className="flex-1 basis-1/4"
                      size={"default"}
                      variant={"default"}
                    >
                      add
                    </Button>
                  </div>

                  <ScrollArea className="mb-2 box-content h-[27rem]">
                    <ul>
                      {bingoEntries.map((entry) => (
                        <li key={entry.id} className="mb-2 flex items-center">
                          <div className="col-span-3 flex-grow ">
                            {entry.text}
                          </div>
                          <div>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => {
                                deleteTask
                                  .mutateAsync(entry.id)
                                  .then(() => {
                                    tasks.refetch().catch((e) => {
                                      console.error(e); //TODO: improve error handling
                                    });
                                  })
                                  .catch((e) => {
                                    console.error(e); //TODO: improve error handling
                                  });
                              }}
                            >
                              <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                  <Button
                    variant="secondary"
                    onClick={handleFillPlayfield}
                    className="w-full"
                  >
                    Fill playfield
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogWindow
        open={open}
        setOpen={setOpen}
        title="Error"
        windowIcon={faBomb}
      >
        <div>{error}</div>
      </DialogWindow>
    </>
  );
}
