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

export default function LoginCard() {
  return (
    <Card className="mx-auto my-8 max-w-96">
      <CardHeader className="text-xl">
        <CardTitle>Welcome to my Bullshit Bingo Game</CardTitle>
        <CardDescription>Login to play</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Button
          onClick={async () => {
            await signIn("github");
          }}
          variant={"secondary"}
        >
          Github
        </Button>
        <Button
          onClick={async () => {
            await signIn("google");
          }}
          variant={"secondary"}
        >
          Google
        </Button>
      </CardContent>
    </Card>
  );
}
