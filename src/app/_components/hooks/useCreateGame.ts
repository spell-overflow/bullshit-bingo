"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function useCreateGame() {
  const createGame = api.bingo.createGame.useMutation();
  const tasks = api.bingo.getTasks.useQuery();
  const utils = api.useUtils();
  const router = useRouter();

  const bingoEntries = useMemo(() => {
    return tasks.status === "success" ? tasks.data : [];
  }, [tasks]);

  const handleCreateGame = async (name: string) => {
    try {
      const playfieldSize = 5 * 5;
      if (!bingoEntries[0]) {
        console.log("No bingo entries found");
        return;
      }

      const shuffledEntries = [...bingoEntries].sort(() => Math.random() - 0.5);
      const repeatedEntries = Array.from(
        { length: playfieldSize },
        (_, i) => shuffledEntries[i % shuffledEntries.length]?.text ?? "",
      );
      const playfieldEntries = repeatedEntries.sort(() => Math.random() - 0.5);

      await createGame.mutateAsync({
        name,
        entries: playfieldEntries,
      });
      await utils.bingo.invalidate();
      console.log(`Game created: ${name}`);
      router.push("/playfield");
    } catch (e) {
      console.error("Error creating playfield:", e);
    }
  };
  return { handleCreateGame };
}
