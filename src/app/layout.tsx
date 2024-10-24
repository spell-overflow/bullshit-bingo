import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import SessionContext from "./_components/sessionContext";
import { ThemeProvider } from "./_components/theme-provider";
import NavBar from "./_components/navBar";
import MobileNav from "./_components/mobileNav";
import Footer from "./_components/footer";
import { ScrollArea } from "~/components/ui/scroll-area";
import ConfettiComponent from "./_components/confetti";
import { Toaster } from "~/components/ui/toaster";
import Bubble from "@/src/app/_components/bubble";
import Lettering from "@/src/app/_components/lettering";

export const metadata = {
  title: "Bullshit Bingo",
  description: "A Bullshit Bingo game by Anneke Hugenberg",
  icons: [{ rel: "icon", url: "/tabIcon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionContext>
              <div className="flex min-h-screen w-full flex-col bg-background">
                <div className="mt-5 flex items-center justify-center gap-4">
                  <Lettering width="10rem" />
                  <Bubble className="hidden sm:flex" />
                </div>
                <NavBar className="hidden w-4/5 justify-center self-center text-right sm:block sm:text-3xl" />
                <div className="flex flex-grow items-center justify-center">
                  <div className="h-full w-full">{children}</div>
                </div>
                <Footer className="hidden sm:flex" />
                <Toaster />
                <MobileNav className="sm:hidden" />
                <ConfettiComponent />
              </div>
            </SessionContext>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
