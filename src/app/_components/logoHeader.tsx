"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Bubble from "./bubble";
import Lettering from "./lettering";
import DarkMode from "./darkmode";
import { Button } from "~/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/pro-regular-svg-icons/faArrowRightFromBracket";

export default function LogoHeader() {
  const { data: session } = useSession();

  return (
    <div className="hidden">
      <div className="mt-2 flex items-center justify-center gap-6 lg:col-span-2">
        <div className="inline-block align-middle">
          <Lettering />
        </div>
        <div className="inline-block align-middle">
          <Bubble />
        </div>
      </div>
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
            <AvatarFallback className="bg-card">
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
    </div>
  );
}
