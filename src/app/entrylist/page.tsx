"use client";

import {
  faBomb,
  faDiamondExclamation,
  faIcons,
} from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Container from "~/app/_components/container";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import DialogWindow from "~/app/_components/dialogWindow";
import { useFillPlayfield } from "~/app/_components/hooks/useFillPlayfield";
import { useDeleteTasklist } from "~/app/_components/hooks/useDeleteTasklist";
import { useDeletePlayfield } from "~/app/_components/hooks/useDeletePlayfield";

export default function Tasklist(): JSX.Element {
  const tasks = api.bingo.getTasks.useQuery();
  const addTask = api.bingo.addTask.useMutation();
  const deleteTask = api.bingo.deleteTask.useMutation();
  const playfield = api.bingo.getPlayfield.useQuery();
  const isPlayfield =
    playfield.status === "success" && playfield.data.some((p) => p.playfield.id)
      ? true
      : false;

  const bingoEntries = tasks.status === "success" ? tasks.data : [];
  const numberOfColumns = 5;

  const [entryInput, setEntryInput] = React.useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [windowIcon, setWindowIcon] = React.useState(faIcons);
  const [primaryButtonText, setPrimaryButtonText] = React.useState("");
  const [onPrimaryClick, setOnPrimaryClick] = React.useState<
    (() => void) | undefined
  >();
  const [secondaryButtonText, setSecondaryButtonText] = React.useState("");
  const [onSecondaryClick, setOnSecondaryClick] = React.useState<
    (() => void) | undefined
  >();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { handleFillPlayfield } = useFillPlayfield();
  const { handleDeleteTasklist } = useDeleteTasklist(setOpen, inputRef);
  const { handleDeletePlayfield } = useDeletePlayfield(setOpen);

  const addEntry = () => {
    const trimmedEntryInput = entryInput.trim();

    const errorMessages = {
      tooLong: "Entry is too long. Try a shorter one!",
      tooShort: "Entry is too short. Try a longer one!",
      listFull: "List full! - You can start your game",
      entryExists: "Entry already exists",
    };

    const showErrorDialog = (message: string) => {
      setDialogTitle("Error");
      setDialogText(message);
      setPrimaryButtonText("OK - bring me back");
      setWindowIcon(faBomb);
      setOpen(true);
    };

    if (trimmedEntryInput.length > 24) {
      showErrorDialog(errorMessages.tooLong);
      return;
    } else if (trimmedEntryInput.length < 3) {
      showErrorDialog(errorMessages.tooShort);
      return;
    } else if (bingoEntries.length === 25) {
      showErrorDialog(errorMessages.listFull);
      return;
    } else if (bingoEntries.find((entry) => entry.text === trimmedEntryInput)) {
      showErrorDialog(errorMessages.entryExists);
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
    <Container className="flex flex-col">
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
          onClick={() => {
            setDialogTitle("Delete Tasklist?");
            setDialogText(
              "Are you sure you want to delete the whole tasklist? This can't be undone!",
            );
            setWindowIcon(faDiamondExclamation);
            setPrimaryButtonText("No. Bring me back");
            setOnPrimaryClick(() => () => {
              setOpen(false);
            });
            setSecondaryButtonText("Yes, delete it");
            setOnSecondaryClick(() => () => {
              handleDeleteTasklist().catch((e) => {
                console.error(e);
              });
              setOpen(false);
            });
            setOpen(true);
          }}
          className="w-full"
        >
          clear Tasklist
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (isPlayfield === true) {
              setDialogTitle("Delete Playfield?");
              setDialogText(
                "Are you sure you want to delete the whole Playfield and Game? This can't be undone!",
              );
              setWindowIcon(faDiamondExclamation);
              setPrimaryButtonText("No. Bring me back");
              setOnPrimaryClick(() => () => {
                setOpen(false);
              });
              setSecondaryButtonText("Yes, delete it");
              setOnSecondaryClick(() => () => {
                handleDeletePlayfield().catch((e) => {
                  console.error(e);
                });
                handleFillPlayfield(numberOfColumns).catch((e) => {
                  console.error(e);
                });
                setOpen(false);
              });
              setOpen(true);
            } else {
              handleFillPlayfield(numberOfColumns).catch((e) => {
                console.error(e);
              });
            }
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
        dialogText={dialogText}
        primaryButtonText={primaryButtonText}
        onPrimaryClick={
          onPrimaryClick ??
          (() => {
            setOpen(false);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          })
        }
        secondaryButtonText={secondaryButtonText}
        onSecondaryClick={onSecondaryClick}
      />
    </Container>
  );
}
