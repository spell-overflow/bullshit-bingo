"use client";

import React from "react";
import Playfield from "./playfield";

export default function Bingo() {
  const [bingoEntries, setBingoEntries] = React.useState(["a", "b", "c", "d"]);

  const addEntry = () => {
    setBingoEntries([...bingoEntries, Math.random().toString()]);
  };

  return (
    <>
      <h1 className="text-2xl">Bingo</h1>
      <div className="flex space-x-5">
        <div className="flex-auto">
          <Playfield entries={bingoEntries} />
        </div>
        <div className="flex-auto">
          <button onClick={addEntry}>add</button>
        </div>
      </div>
    </>
  );
}
