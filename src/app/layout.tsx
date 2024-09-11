import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionContext from "./_components/sessionContext";

export const metadata = {
  title: "Bullshit Bingo",
  description: "A Bullshit Bingo game by Anneke Hugenberg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SessionContext>{children}</SessionContext>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
