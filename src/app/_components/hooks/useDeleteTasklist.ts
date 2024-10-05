import { api } from "~/trpc/react";

export function useDeleteTasklist(
  setOpen: (open: boolean) => void,
  inputRef: React.RefObject<HTMLInputElement>,
) {
  const deleteTasklist = api.bingo.deleteTasklist.useMutation();
  const utils = api.useUtils();

  const handleDeleteTasklist = async () => {
    try {
      await deleteTasklist.mutateAsync();
      await utils.bingo.invalidate();
    } catch (e) {
      console.error("Error deleting tasklist", e);
    } finally {
      setOpen(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return { handleDeleteTasklist };
}
