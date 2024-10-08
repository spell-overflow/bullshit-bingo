import { api } from "~/trpc/react";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export function useFillPlayfield() {
  const createPlayfield = api.bingo.createPlayfield.useMutation();
  const tasks = api.bingo.getTasks.useQuery();
  const utils = api.useUtils();
  const bingoEntries = useMemo(() => {
    return tasks.status === "success" ? tasks.data : [];
  }, [tasks]);
  const router = useRouter();

  const handleFillPlayfield = useCallback(
    async (numberOfColumns: number) => {
      const playfieldSize = numberOfColumns * numberOfColumns;
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
      try {
        await createPlayfield.mutateAsync(playfieldEntries);
        await utils.bingo.invalidate();
      } catch (e) {
        console.error("Error creating playfield:", e);
      }
      router.push("/playfield");
    },
    [bingoEntries, createPlayfield, utils.bingo, router],
  );
  return { handleFillPlayfield };
}
