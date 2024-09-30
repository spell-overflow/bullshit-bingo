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
import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";

interface NavItem {
  name: string;
  icon: IconDefinition;
}

interface NavProperties {
  className?: string;
  navItems: NavItem[];
}

const NavBar: React.FC<NavProperties> = ({ className, navItems }) => {
  return (
    <div className={className}>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href="" legacyBehavior passHref>
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
