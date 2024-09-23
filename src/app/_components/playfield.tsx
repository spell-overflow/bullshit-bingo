"use client";

import { useEffect, useState } from "react";
// import ModalDialog from "./modalDialog";
import ConfettiComponent from "./confetti";
import React from "react";
import DialogWindow from "./dialogWindow";
import { faTrophyStar } from "@fortawesome/pro-regular-svg-icons";

type FieldObject = { text: string; crossed: boolean };

export default function Playfield({
  entries,
  numberOfColumns,
}: {
  entries: FieldObject[];
  numberOfColumns: number;
}): JSX.Element {
  const fieldSize = numberOfColumns * numberOfColumns;

  const [playfield, setPlayfield] = useState<FieldObject[]>([]);
  const [open, setOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

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
  }, [playfield, fieldSize, numberOfColumns]);

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8">
      <DialogWindow
        open={open}
        setOpen={(newState) => {
          if (newState === false) {
            initializePlayfield();
            setOpen(newState);
            setCelebrate(false);
          }
        }}
        title="Won Game!"
        windowIcon={faTrophyStar}
        description="won game"
      >
        <div className="text-7xl">Gratulation!</div>
        <div className="text-4xl">You won this game!</div>
      </DialogWindow>
      <ConfettiComponent
        celebrate={celebrate}
        setCelebrate={(newState) => {
          setCelebrate(newState);
        }}
      />

      <div className="mx-auto grid w-fit grid-cols-5 justify-items-center gap-5">
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
      className="relative flex h-24 w-24 items-center justify-center overflow-hidden text-ellipsis hyphens-auto rounded-xl bg-accent text-primary-foreground shadow"
      onClick={() => {
        onChange(!entry.crossed);
      }}
    >
      {entry.text}
      {entry.crossed ? (
        <>
          <div className="absolute -left-12 top-12 h-1 w-48 rotate-45 bg-primary"></div>
          <div className="absolute -left-12 top-12 h-1 w-48 -rotate-45 bg-primary"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
