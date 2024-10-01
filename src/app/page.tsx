import { auth } from "~/server/auth";
import LoginCard from "./_components/loginCard";
import Playfield from "./_components/playfield";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <LoginCard />;
  }

  return <Playfield />;
}
