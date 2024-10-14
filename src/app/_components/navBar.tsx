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
import Export from "./export";

interface NavProperties {
  className?: string;
}

const NavBar: React.FC<NavProperties> = ({ className }) => {
  return (
    <div className={className}>
      <Export className="absolute right-40" />
      <DarkMode className="absolute right-20 ml-24" />
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
