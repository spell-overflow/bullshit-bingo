"use client";

import { Button } from "~/components/ui/button";
import { useDeletePlayfield } from "~/app/_components/hooks/useDeletePlayfield";
import React from "react";
import {
  faDiamondExclamation,
  faIcons,
} from "@fortawesome/pro-regular-svg-icons";
import DialogWindow from "../_components/dialogWindow";
import CreateGameDialog from "../_components/createGameDialog";
import Container from "../_components/container";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { games } from "~/server/db/schema";

export default function Games() {
  const [open, setOpen] = React.useState<boolean>(false);
  React.useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [windowIcon, setWindowIcon] = React.useState(faIcons);
  const [primaryButtonText, setPrimaryButtonText] = React.useState("");
  const [onPrimaryClick, setOnPrimaryClick] = React.useState<
    (() => void) | undefined
  >();
  const [secondaryButtonText, setSecondaryButtonText] = React.useState("");
  const [onSecondaryClick, setOnSecondaryClick] = React.useState<
    (() => void) | undefined
  >();
  const handleDeletePlayfield = useDeletePlayfield(setOpen);
  const [createGameDialogOpen, setCreateGameDialogOpen] =
    React.useState<boolean>(false);
  const games = api.bingo.getGames.useQuery();
  type Game = NonNullable<typeof games.data>[number];
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <Container className="grid grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Games</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {games.data?.map((game) => (
                <li
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
                >
                  {game.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Game Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedGame ? (
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {selectedGame?.name}
                </p>
                <p>
                  <strong>ID:</strong> {selectedGame?.id}
                </p>
                <p>
                  <strong>Start Date: </strong>{" "}
                  {selectedGame?.createdAt.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">choose a game from the list</p>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            onClick={() => {
              setDialogTitle("Delete Playfield?");
              setDialogText(
                "Are you sure you want to delete the whole Playfield and Game? This can't be undone!",
              );
              setWindowIcon(faDiamondExclamation);
              setPrimaryButtonText("No. Bring me back");
              setOnPrimaryClick(() => () => {
                setOpen(false);
              });
              setSecondaryButtonText("Yes, delete it");
              setOnSecondaryClick(() => () => {
                handleDeletePlayfield.handleDeletePlayfield().catch((e) => {
                  console.error(e);
                });
                setOpen(false);
              });
              setOpen(true);
            }}
            className="w-full"
          >
            delete Playfield
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              setCreateGameDialogOpen(true);
            }}
          >
            Create Game
          </Button>
        </div>

        <DialogWindow
          open={open}
          onOpenChange={() => {
            setOpen(false);
          }}
          title={dialogTitle}
          windowIcon={windowIcon}
          dialogText={dialogText}
          primaryButtonText={primaryButtonText}
          onPrimaryClick={
            onPrimaryClick ??
            (() => {
              setOpen(false);
            })
          }
          secondaryButtonText={secondaryButtonText}
          onSecondaryClick={onSecondaryClick}
        ></DialogWindow>
        <CreateGameDialog
          open={createGameDialogOpen}
          setOpen={setCreateGameDialogOpen}
        />
      </Container>
    </div>
  );
}
