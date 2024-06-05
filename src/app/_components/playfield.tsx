export default function Playfield() {
  const playfield: JSX.Element[] = [];

  // initilize playfield
  for (let i = 0; i < 25; i++) {
    playfield.push(<div>0</div>);
  }

  return <div className="grid grid-cols-5 gap-5">{playfield}</div>;
}
