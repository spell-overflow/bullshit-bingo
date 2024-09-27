"use client";

import React, { MouseEventHandler } from "react";
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
import {
  faBomb,
  faIcons,
  faQuestion,
} from "@fortawesome/pro-regular-svg-icons";
import DarkMode from "./darkmode";

export default function Bingo() {
  const numberOfColumns = 5;

  const { data: session } = useSession();
  const tasks = api.bingo.getTasks.useQuery();
  const addTask = api.bingo.addTask.useMutation();
  const deleteTask = api.bingo.deleteTask.useMutation();
  const playfield = api.bingo.getPlayfield.useQuery();
  const createPlayfield = api.bingo.createPlayfield.useMutation();
  const deleteTasklist = api.bingo.deleteTasklist.useMutation();

  const bingoEntries = tasks.status === "success" ? tasks.data : [];

  const [entryInput, setEntryInput] = React.useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [windowIcon, setWindowIcon] = React.useState(faIcons);
  const [primaryButtonText, setPrimaryButtonText] = React.useState("");
  const [secondaryButtonText, setSecondaryButtonText] = React.useState("");
  const [secondaryClick, setSecondaryClick] =
    React.useState<MouseEventHandler<HTMLButtonElement>>();
  const [rerenderMe, setRerenderMe] = React.useState<boolean>(false);

  const addEntry = () => {
    const trimmedEntryInput = entryInput.trim();

    if (trimmedEntryInput.length > 24) {
      setDialogTitle("Error");
      setDialogText("Entry is too long. Try a shorter one!");
      setPrimaryButtonText("OK - bring me back");
      setWindowIcon(faBomb);
      setOpen(true);
      return;
    } else if (trimmedEntryInput.length < 3) {
      setDialogTitle("Error");
      setDialogText("Entry is too short. Try a longer one!");
      setPrimaryButtonText("OK - bring me back");
      setWindowIcon(faBomb);
      setOpen(true);
      return;
    } else if (bingoEntries.length === 25) {
      setDialogTitle("Error");
      setDialogText("List full! - You can start your game");
      setPrimaryButtonText("OK - bring me back");
      setWindowIcon(faBomb);
      setOpen(true);
      return;
    } else if (bingoEntries.find((entry) => entry.text === trimmedEntryInput)) {
      setDialogTitle("Error");
      setDialogText("Entry already exists");
      setPrimaryButtonText("OK - bring me back");
      setWindowIcon(faBomb);
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

  const confirmation = () => {
    setDialogTitle("Really?");
    setWindowIcon(faQuestion);
    setDialogText("Do you really want to delete all tasks in Tasklist?");
    setPrimaryButtonText("No. Bring me back.");
    setSecondaryButtonText("Yes. Delete all Tasks.");
    setSecondaryClick(handleDeleteTasklist);
    setOpen(true);
  };

  const handleDeleteTasklist =
    () => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        deleteTasklist.mutate();
        setRerenderMe(true);
        setOpen(false);
        console.log("Tasklist deleted");
      } catch (e) {
        console.error("Error deleting tasklist", e);
      }
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
                  <div className="relative">
                    <Button
                      variant="default"
                      onClick={confirmation}
                      className="absolute bottom-8 my-4 w-full"
                    >
                      clear Tasklist
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleFillPlayfield}
                      className="absolute bottom-0 w-full"
                    >
                      Fill playfield
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogWindow
        open={open}
        onOpenChange={() => setOpen(false)}
        title={dialogTitle}
        description={dialogText}
        windowIcon={windowIcon}
        primaryButtonText={primaryButtonText}
        onPrimaryClick={() => setOpen(false)}
        secondaryButtonText={secondaryButtonText}
        onSecondaryClick={secondaryClick}
      />
    </>
  );
}
