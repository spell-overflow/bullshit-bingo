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
import Lettering from "./lettering";
import Bubble from "./bubble";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/pro-regular-svg-icons";

export default function LoginCard() {
  return (
    <>
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
      <Card className="mx-auto my-8 max-w-96 bg-card">
        <CardHeader className="text-xl">
          <CardTitle>Welcome to my Bullshit Bingo Game</CardTitle>
          <CardDescription className="flex justify-center text-card-foreground">
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
    </>
  );
}
