import Bingo from "./_components/bingo";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-indigo-900 text-indigo-400">
      <Bingo />
    </main>
  );
}
