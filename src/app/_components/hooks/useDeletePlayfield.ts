import { api } from "~/trpc/react";

export function useDeletePlayfield(setOpen: (open: boolean) => void) {
  const deletePlayfield = api.bingo.deletePlayfield.useMutation();
  const utils = api.useUtils();

  const handleDeletePlayfield = async () => {
    try {
      await deletePlayfield.mutateAsync();
      await utils.bingo.invalidate();
    } catch (e) {
      console.error("Error deleting playfield", e);
    } finally {
      setOpen(false);
    }
  };

  return { handleDeletePlayfield };
}
