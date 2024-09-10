"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function LoginCard() {
  return (
    <Card className="mx-auto my-8 max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={async () => {
            await signIn("github");
          }}
        >
          Github
        </Button>
        <Button
          onClick={async () => {
            await signIn("google");
          }}
        >
          Google
        </Button>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
