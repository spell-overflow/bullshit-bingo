"use client";

import { faSignInAlt, faSignOutAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function User(): JSX.Element {
  const { data: session } = useSession();
  const userName = session ? session?.user.name : "You wonderful human being";
  const greeting = `Hello ${userName}!💗`;
  return (
    <div className="flex flex-col items-center text-center text-lg">
      <div>{greeting}</div>
      {session ? (
        <Button
          onClick={async () => {
            await signOut();
          }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await signIn();
          }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Login
        </Button>
      )}
    </div>
  );
}
