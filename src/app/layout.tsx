import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Lettering from "./_components/lettering";
import Bubble from "./_components/bubble";
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
      <body className="bg-curious-blue-200">
        <div className="w-full text-center">
          <div className="inline-block align-middle">
            <Lettering />
          </div>
          <div className="inline-block align-middle">
            <Bubble />
          </div>
        </div>
        <TRPCReactProvider>
          <SessionContext>{children}</SessionContext>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
