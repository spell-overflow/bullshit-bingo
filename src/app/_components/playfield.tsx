"use client";

export default function Playfield({
  entries,
}: {
  entries: string[];
}): JSX.Element {
  const playfield: JSX.Element[] = [];

  // initilize playfield
  for (let i = 0; i < 25; i++) {
    const entry = entries[i];

    playfield.push(<div key={i}>{entry ? entry : 0}</div>);
  }

  return <div className="grid grid-cols-5 gap-5">{playfield}</div>;
}
