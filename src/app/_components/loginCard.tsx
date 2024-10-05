"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/pro-regular-svg-icons";

export default function LoginCard() {
  return (
    <Card className="min-w-56 text-center shadow-none">
      <CardHeader>
        <CardTitle className="min-w-56 text-xl text-accent-foreground">
          <p>
            Welcome to my
            <br /> Bullshit-Bingo
          </p>
        </CardTitle>
        <CardDescription className="text-base text-card-foreground">
          Login to play
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Button
          onClick={async () => {
            await signIn("keycloak");
          }}
          variant={"secondary"}
        >
          Login
          <FontAwesomeIcon icon={faArrowRightToBracket} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
    /*     <div className="bg-red-400">
      <Card className="shadow-none">
        <CardHeader className="text-xl">
          <CardTitle>Welcome to my Bullshit Bingo Game</CardTitle>
          <CardDescription className="flex justify-center">
            Login to play
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Button
            onClick={async () => {
              await signIn("keycloak");
            }}
            variant={"secondary"}
          >
            Login
            <FontAwesomeIcon icon={faArrowRightToBracket} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div> */
  );
}
