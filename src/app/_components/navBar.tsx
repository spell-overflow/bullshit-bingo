"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { navItems } from "./navItems";
import DarkMode from "./darkmode";

interface NavProperties {
  className?: string;
}

const NavBar: React.FC<NavProperties> = ({ className }) => {
  return (
    <div className={className}>
      <DarkMode className="absolute right-20 ml-24 hover:bg-background" />
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.navBar.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.link} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
