"use client";

import { faGrid5 } from "@fortawesome/pro-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import Lettering from "../_components/lettering";
import Bubble from "../_components/bubble";
import MobileNav from "../_components/mobileNav";
import NavBar from "../_components/navBar";

interface NavItem {
  name: string;
  icon: IconDefinition;
}

export default function newRoot() {
  const navItems: NavItem[] = [{ name: "Game", icon: faGrid5 }];

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      {/*  logos */}
      <div className="mt-5 flex justify-between">
        <div className="ml-7 w-16" />
        <Lettering width="10rem" />
        <Bubble className="mr-7 w-16" />
      </div>

      <NavBar className="hidden sm:block" navItems={navItems}></NavBar>

      {/* playfield */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-md px-2">
          <div className="mx-5 grid grid-cols-5 grid-rows-5 gap-2 overflow-hidden text-sm">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="flex aspect-square min-h-12 items-center justify-center rounded-sm bg-primary"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <MobileNav navItems={navItems} className="sm:hidden" />
    </div>
  );
}
