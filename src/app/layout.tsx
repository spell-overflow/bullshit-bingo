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
import AppHeader from "./_components/appHeader";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionContext>
              <div className="flex min-h-screen w-full flex-col justify-between bg-background">
                <AppHeader />
                <NavBar className="mb-auto hidden w-4/5 justify-center self-center text-right sm:block sm:text-3xl"></NavBar>
                <div className="mx-2 rounded-lg bg-card shadow-lg sm:mx-auto">
                  <ScrollArea className="flex max-h-[calc(100vh-200px)] flex-col justify-center">
                    <div className="p-2 shadow sm:p-4">{children}</div>
                  </ScrollArea>
                </div>
                <Footer className="hidden sm:flex" />
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
