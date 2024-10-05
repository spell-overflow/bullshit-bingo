"use client";

import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import React from "react";
import DialogWindow from "../_components/dialogWindow";
import { faTrophyStar, faX } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "~/trpc/react";
import { useCelebrateStore } from "../store";
import { useFillPlayfield } from "../_components/hooks/useFillPlayfield";
import { useDeleteTasklist } from "../_components/hooks/useDeleteTasklist";

export type FieldObject = { text: string; crossed: boolean };

export default function Playfield(): JSX.Element {
  React.useState<MouseEventHandler<HTMLButtonElement>>();
  React.useState<boolean>(false);

  const playfield2 = api.bingo.getPlayfield.useQuery();

  const entries = React.useMemo(
    () =>
      playfield2.data?.map((entry) => ({
        text: entry.playfieldentry?.text ?? "",
        crossed: entry.playfieldentry?.isCrossed ?? false,
      })) ?? ([] as FieldObject[]),
    [playfield2.data],
  );

  const numberOfColumns = 5;
  const fieldSize = numberOfColumns * numberOfColumns;

  const [playfield, setPlayfield] = useState<FieldObject[]>([]);
  const [open, setOpen] = useState(false);
  const { setCelebrate } = useCelebrateStore();
  const { handleFillPlayfield } = useFillPlayfield();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { handleDeleteTasklist } = useDeleteTasklist(setOpen, inputRef);

  const initializePlayfield = () => {
    const newPlayfield: FieldObject[] = [];

    // initilize playfield
    for (let i = 0; i < fieldSize; i++) {
      const entry = entries[i];

      newPlayfield.push(entry ?? { text: "", crossed: false });
    }

    setPlayfield(newPlayfield);
  };
  useEffect(initializePlayfield, [entries, fieldSize]);

  useEffect(() => {
    const firstRow = playfield.slice(0, numberOfColumns);
    const firstColumn = playfield.filter((value, index) => {
      return index % numberOfColumns === 0;
    });
    const winInFirstRow = firstRow.find((entry, index) => {
      if (!entry.crossed) {
        return false;
      }

      let rowFull = true;
      for (
        let i = index + numberOfColumns;
        i < fieldSize;
        i += numberOfColumns
      ) {
        if (!playfield[i]?.crossed) {
          rowFull = false;
        }
      }

      return rowFull;
    });

    if (!winInFirstRow) {
      const winInFirstColumn = firstColumn.find((entry, index) => {
        if (!entry.crossed) {
          return false;
        }

        const indexInPlayfield = index * numberOfColumns;
        let columnFull = true;
        for (
          let i = indexInPlayfield + 1;
          i < indexInPlayfield + numberOfColumns;
          i++
        ) {
          if (!playfield[i]?.crossed) {
            columnFull = false;
          }
        }

        return columnFull;
      });

      if (winInFirstColumn) {
        setOpen(true);
        setCelebrate(true);
      }
    } else {
      setOpen(true);
      setCelebrate(true);
    }
  }, [playfield, fieldSize, numberOfColumns, setCelebrate]);

  return (
    <div className="">
      <DialogWindow
        open={open}
        onOpenChange={() => setOpen(false)}
        title="Won Game!"
        windowIcon={faTrophyStar}
        primaryButtonText="New Game: Same Bingolist"
        onPrimaryClick={async () => {
          await handleFillPlayfield(numberOfColumns);
          setOpen(false);
          setCelebrate(false);
        }}
        secondaryButtonText="New Game: New Bingolist"
        onSecondaryClick={async () => {
          // await deletePlayfield();
          await handleDeleteTasklist();
          setOpen(false);
          setCelebrate(false);
        }}
      >
        <div>
          <p>
            Congratulation! <br /> Click{" "}
            <span className="italic">same Bingolist</span> to play with the same
            list or <span className="italic">new Bingolist</span> to create a
            new bingolist.
          </p>
        </div>
      </DialogWindow>
      {/* Playfield */}
      <div className="grid grid-cols-5 grid-rows-5 gap-2 overflow-hidden text-sm">
        {playfield.map((e, i) => (
          <PlayfieldElement
            key={i}
            entry={e}
            onChange={(state) => {
              const newPlayfield = [...playfield];
              const oldPlayfieldEntry = playfield[i];
              if (oldPlayfieldEntry) {
                newPlayfield[i] = { ...oldPlayfieldEntry };
                newPlayfield[i].crossed = state;
                setPlayfield(newPlayfield);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PlayfieldElement({
  entry,
  onChange,
}: {
  entry: FieldObject;
  onChange: (state: boolean) => void;
}): JSX.Element {
  return (
    <div
      className="relative flex aspect-square min-h-12 items-center justify-center rounded-sm bg-primary"
      onClick={() => {
        onChange(!entry.crossed);
      }}
    >
      {entry.text}
      {entry.crossed ? (
        <>
          <div className="absolute flex items-center justify-center text-transparent/50">
            <FontAwesomeIcon icon={faX} size="5x" className="" />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
