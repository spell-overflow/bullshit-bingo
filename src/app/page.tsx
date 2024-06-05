import Playfield from "./_components/playfield";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-2xl">Bingo</h1>
      <div className="flex space-x-5">
        <div className="flex-auto">
          <Playfield />
        </div>
        <div className="flex-auto">hi</div>
      </div>
    </main>
  );
}
