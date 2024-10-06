"use client";

import { faBomb, faIcons } from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import DialogWindow from "~/app/_components/dialogWindow";
import { useFillPlayfield } from "~/app/_components/hooks/useFillPlayfield";
import { useDeleteTasklist } from "~/app/_components/hooks/useDeleteTasklist";

interface TasklistProperties {
  numberOfColumns: number;
}

export default function Tasklist({
  numberOfColumns,
}: TasklistProperties): JSX.Element {
  const tasks = api.bingo.getTasks.useQuery();
  const addTask = api.bingo.addTask.useMutation();
  const deleteTask = api.bingo.deleteTask.useMutation();

  const bingoEntries = tasks.status === "success" ? tasks.data : [];
  numberOfColumns = 5;

  const [entryInput, setEntryInput] = React.useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [windowIcon, setWindowIcon] = React.useState(faIcons);
  const [primaryButtonText, setPrimaryButtonText] = React.useState("");
  const [secondaryButtonText] = React.useState("");
  const [onSecondaryClick] = React.useState<(() => void) | undefined>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { handleFillPlayfield } = useFillPlayfield();
  const { handleDeleteTasklist } = useDeleteTasklist(setOpen, inputRef);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEntryInput(event.target.value);
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-2 bg-card">
        <Input
          type="text"
          placeholder="your task"
          onChange={handleInputChange}
          value={entryInput}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addEntry();
            }
          }}
          ref={inputRef}
        />
        <Button onClick={addEntry} size={"default"} variant={"default"}>
          add
        </Button>
      </div>

      <ul className="rounded-lg bg-primary p-4 shadow">
        {bingoEntries.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between">
            <div className=" ">{entry.text}</div>
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
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-4">
        <Button
          variant="default"
          onClick={handleDeleteTasklist}
          className="w-full"
        >
          clear Tasklist
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            await handleFillPlayfield(numberOfColumns);
          }}
          className="w-full"
        >
          Fill playfield
        </Button>
      </div>
      <DialogWindow
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }}
        title={dialogTitle}
        windowIcon={windowIcon}
        description={dialogText}
        primaryButtonText={primaryButtonText}
        onPrimaryClick={() => {
          setOpen(false);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }}
        secondaryButtonText={secondaryButtonText}
        onSecondaryClick={onSecondaryClick}
      />
    </>
  );
}
