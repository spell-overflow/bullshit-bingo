"use client";

import Playfield from "./playfield";
import type { FieldObject } from "./playfield";
import { api } from "~/trpc/react";
import Tasklist from "./tasklist";
import type { MouseEventHandler } from "react";
import React from "react";
import LogoHeader from "./logoHeader";

export default function Bingo() {
  const numberOfColumns = 5;
  const playfield = api.bingo.getPlayfield.useQuery();

  React.useState<MouseEventHandler<HTMLButtonElement>>();
  React.useState<boolean>(false);

  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            <LogoHeader />

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
