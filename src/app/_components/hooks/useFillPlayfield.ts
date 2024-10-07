import { api } from "~/trpc/react";
import { useCallback, useMemo } from "react";

export function useFillPlayfield() {
  const createPlayfield = api.bingo.createPlayfield.useMutation();
  const tasks = api.bingo.getTasks.useQuery();
  const utils = api.useUtils();
  const bingoEntries = useMemo(() => {
    return tasks.status === "success" ? tasks.data : [];
  }, [tasks]);

  const handleFillPlayfield = useCallback(
    async (numberOfColumns: number) => {
      const playfieldSize = numberOfColumns * numberOfColumns;
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
    },
    [bingoEntries, createPlayfield, utils.bingo],
  );
  return { handleFillPlayfield };
}
