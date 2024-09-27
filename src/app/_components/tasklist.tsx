"use client";

import {
  faBomb,
  faIcons,
  faQuestion,
} from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { MouseEventHandler } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";
import DialogWindow from "./dialogWindow";

interface TasklistProperties {
  numberOfColumns: number;
}

export default function Tasklist({
  numberOfColumns,
}: TasklistProperties): JSX.Element {
  const tasks = api.bingo.getTasks.useQuery();
  const addTask = api.bingo.addTask.useMutation();
  const deleteTask = api.bingo.deleteTask.useMutation();
  const createPlayfield = api.bingo.createPlayfield.useMutation();
  const deleteTasklist = api.bingo.deleteTasklist.useMutation();

  const bingoEntries = tasks.status === "success" ? tasks.data : [];
  numberOfColumns = numberOfColumns;

  const [entryInput, setEntryInput] = React.useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [windowIcon, setWindowIcon] = React.useState(faIcons);
  const [primaryButtonText, setPrimaryButtonText] = React.useState("");
  const [secondaryButtonText, setSecondaryButtonText] = React.useState("");
  const [onSecondaryClick, setOnSecondaryClick] =
    React.useState<MouseEventHandler<HTMLButtonElement>>();
  const utils = api.useUtils();

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
        utils.bingo.invalidate().catch((e) => console.error(e));
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
    setOnSecondaryClick(handleDeleteTasklist);
    setOpen(true);
  };

  const handleDeleteTasklist =
    () => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        deleteTasklist
          .mutateAsync()
          .then(() => {
            utils.bingo.invalidate().catch((e) => console.error(e));
          })
          .catch((e) => console.error(e));
        console.log("Tasklist deleted");
        setOpen(false);
      } catch (e) {
        console.error("Error deleting tasklist", e);
        setOpen(false);
      }
    };

  return (
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
                <div className="col-span-3 flex-grow ">{entry.text}</div>
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

      <DialogWindow
        open={open}
        onOpenChange={() => setOpen(false)}
        title={dialogTitle}
        windowIcon={windowIcon}
        description={dialogText}
        primaryButtonText={primaryButtonText}
        onPrimaryClick={() => setOpen(false)}
        secondaryButtonText={secondaryButtonText}
        onSecondaryClick={onSecondaryClick}
      />
    </div>
  );
}
