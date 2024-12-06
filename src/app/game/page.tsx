"use client";

import { Button } from "~/components/ui/button";
import { useDeletePlayfield } from "~/app/_components/hooks/useDeletePlayfield";
import React from "react";
import {
  faDiamondExclamation,
  faIcons,
} from "@fortawesome/pro-regular-svg-icons";
import DialogWindow from "../_components/dialogWindow";
import Container from "../_components/container";

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
  const { handleDeletePlayfield } = useDeletePlayfield(setOpen);

  return (
    <Container className="flex flex-col">
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
            handleDeletePlayfield().catch((e) => {
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
      />
    </Container>
  );
}
