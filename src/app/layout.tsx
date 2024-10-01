import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import SessionContext from "./_components/sessionContext";
import { ThemeProvider } from "./_components/theme-provider";
import Lettering from "@/src/app/_components/lettering";
import Bubble from "@/src/app/_components/bubble";
import NavBar from "./_components/navBar";
import {
  faGrid5,
  faListUl,
  type IconDefinition,
} from "@fortawesome/pro-regular-svg-icons";
import MobileNav from "./_components/mobileNav";
import Footer from "./_components/footer";

interface NavItem {
  name: string;
  icon: IconDefinition;
  link: string;
}

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
  const navItems: NavItem[] = [
    { name: "Game", icon: faGrid5, link: "/" },
    { name: "Lists", icon: faListUl, link: "/entrylist" },
  ];
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
            <div className="flex min-h-screen w-full flex-col justify-between bg-background">
              {/*  logos */}
              <div className="mt-5 flex justify-between">
                <div className="ml-7 w-16" />
                <Lettering width="10rem" />
                <Bubble className="mr-7 w-16" />
              </div>
              <NavBar
                className="mb-auto hidden w-4/5 justify-center self-center text-right sm:block sm:text-3xl"
                navItems={navItems}
              ></NavBar>
              <div className="m-auto flex h-auto max-h-[calc(100vh-200px)] items-center justify-center overflow-y-auto rounded-lg bg-accent p-4">
                {/* <div className="w-full max-w-screen-md px-2"> */}
                <SessionContext>{children}</SessionContext>
                {/* </div> */}
              </div>
              <Footer className="hidden sm:flex" />
              <MobileNav navItems={navItems} className="sm:hidden" />
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
