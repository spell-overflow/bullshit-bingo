"use client";

import { useEffect, useState } from "react";
import ModalDialog from "./modalDialog";

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

      let returnValue = true;
      for (
        let i = index + numberOfColumns;
        i < fieldSize;
        i += numberOfColumns
      ) {
        if (!playfield[i]?.crossed) {
          returnValue = false;
        }
      }

      return returnValue;
    });

    if (!winInFirstRow) {
      const winInFirstColumn = firstColumn.find((entry, index) => {
        if (!entry.crossed) {
          return false;
        }

        const indexInPlayfield = index * numberOfColumns;
        let returnValue = true;
        for (
          let i = indexInPlayfield + 1;
          i < indexInPlayfield + numberOfColumns;
          i++
        ) {
          if (!playfield[i]?.crossed) {
            returnValue = false;
          }
        }

        return returnValue;
      });

      if (winInFirstColumn) {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  }, [playfield, fieldSize, numberOfColumns]);

  return (
    <>
      <ModalDialog
        open={open}
        setOpen={(newState) => {
          initializePlayfield();
          setOpen(newState);
        }}
        title="Won Game!"
        text="Gratulation! You have won this game!"
        buttonText="Start a New Game"
      />
      <div className="grid grid-cols-5 gap-5">
        {playfield.map((e, i) => (
          <PlayfieldElement
            key={i}
            entry={e}
            onChange={(state) => {
              const newPlayfield = [...playfield];
              const oldPlayfieldEntry = playfield[i];
              if (oldPlayfieldEntry) {
                newPlayfield[i] = { ...oldPlayfieldEntry };
                newPlayfield[i]!.crossed = state;
                setPlayfield(newPlayfield);
              }
            }}
          />
        ))}
      </div>
    </>
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
      className="relative h-24 w-24 overflow-hidden text-ellipsis rounded-xl bg-indigo-800 p-3 shadow-md"
      onClick={() => {
        onChange(!entry.crossed);
      }}
    >
      {entry.text}
      {entry.crossed ? (
        <>
          <div className="absolute -left-12 top-12 h-1 w-48 rotate-45 bg-gray-500/50"></div>
          <div className="absolute -left-12 top-12 h-1 w-48 -rotate-45 bg-gray-500/50"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
