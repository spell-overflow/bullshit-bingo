"use client";

import DialogWindow from "./dialogWindow";
import { useState } from "react";
import { faPumpkin } from "@fortawesome/pro-regular-svg-icons";
import { Input } from "~/components/ui/input";
import { useCreateGame } from "./hooks/useCreateGame";

export default function CreateGameDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [gameName, setGameName] = useState("");
  const { handleCreateGame } = useCreateGame();

  const onCreateGame = async () => {
    console.log("Create Game clicked:", gameName);
    await handleCreateGame(gameName);
    setGameName("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void onCreateGame();
    }
  };

  return (
    <DialogWindow
      open={open}
      onOpenChange={setOpen}
      title="Create a new Game"
      description="Give your Game a name."
      windowIcon={faPumpkin}
      primaryButtonText="Create it now!"
      onPrimaryClick={onCreateGame}
    >
      <Input
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Game name"
        className="mt-2 w-full rounded border p-2"
        onKeyDown={handleKeyDown}
      />
    </DialogWindow>
  );
}
