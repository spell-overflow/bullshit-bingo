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
      const entries: string[] = [];
      for (let i = 0; i < playfieldSize; i++) {
        const randomNumber = Math.round(
          Math.random() * (bingoEntries.length - 1),
        );
        entries.push(bingoEntries[randomNumber]?.text ?? "");
      }
      try {
        await createPlayfield.mutateAsync(entries);
        await utils.bingo.invalidate();
      } catch (e) {
        console.error("Error creating playfield:", e);
      }
    },
    [bingoEntries, createPlayfield, utils.bingo],
  );
  return { handleFillPlayfield };
}
