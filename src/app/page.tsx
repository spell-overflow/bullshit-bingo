import { auth } from "~/server/auth";
import Bingo from "./_components/bingo";
import LoginCard from "./_components/loginCard";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <LoginCard />;
  }

  return <Bingo />;
}
