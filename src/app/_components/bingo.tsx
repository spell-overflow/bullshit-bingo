"use client";

import Playfield from "./playfield";
import type { FieldObject } from "./playfield";
import { Button } from "~/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-regular-svg-icons/faArrowRightFromBracket";
import Lettering from "./lettering";
import Bubble from "./bubble";
import DarkMode from "./darkmode";
import Tasklist from "./tasklist";
import type { MouseEventHandler } from "react";
import React from "react";

export default function Bingo() {
  const numberOfColumns = 5;
  const { data: session } = useSession();
  const playfield = api.bingo.getPlayfield.useQuery();

  React.useState<MouseEventHandler<HTMLButtonElement>>();
  React.useState<boolean>(false);

  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Header with Logo */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="w-full text-center">
                <div className="inline-block align-middle">
                  <Lettering />
                </div>
                <div className="inline-block align-middle">
                  <Bubble />
                </div>
              </div>
            </div>

            {/* Avatar  */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between rounded-bl-lg rounded-br-lg bg-accent p-4 text-right align-middle text-lg shadow">
                <span className="block max-w-40 overflow-hidden text-ellipsis">
                  {session?.user.name}
                </span>
                <Avatar className="block">
                  <AvatarImage
                    src={session?.user.image ?? undefined}
                    alt="user avatar"
                  />
                  <AvatarFallback className="bg-primary">
                    {session?.user.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DarkMode />
                </div>
                <Button
                  className="block"
                  variant="ghost"
                  size={"icon"}
                  onClick={async () => {
                    await signOut();
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                </Button>
              </div>
            </div>

            {/* Playfield - Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <div className="text-center">
                <Playfield
                  numberOfColumns={numberOfColumns}
                  entries={
                    playfield.data?.map((entry) => ({
                      text: entry.playfieldentry?.text ?? "",
                      crossed: entry.playfieldentry?.isCrossed ?? false,
                    })) ?? ([] as FieldObject[])
                  }
                />
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-4 gap-4">
              <Tasklist numberOfColumns={numberOfColumns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
