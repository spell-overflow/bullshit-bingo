"use client";

import { faSignInAlt, faSignOutAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import DarkMode from "../_components/darkmode";
import Container from "../_components/container";

export default function User(): JSX.Element {
  const { data: session } = useSession();
  const userName = session ? session?.user.name : "You wonderful human being";
  const greeting = `Hello ${userName}!💗`;
  return (
    <Container className="flex flex-col">
      <div className="flex flex-col items-center gap-4 text-center text-lg">
        <div>{greeting}</div>
        {session ? (
          <Button
            onClick={async () => {
              await signOut();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Button>
        ) : (
          <Button
            onClick={async () => {
              await signIn();
            }}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </Button>
        )}
        <DarkMode className="sm:hidden" />
      </div>
    </Container>
  );
}
