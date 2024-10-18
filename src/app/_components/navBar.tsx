"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { navItems } from "./navItems";
import DarkMode from "./darkmode";
import Export from "./export";
import { cn } from "~/lib/utils";

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
              {item.subItems ? (
                <>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] flex-col gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          title={subItem.name}
                          href={subItem.link}
                        ></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink>
                  <Link
                    href={item.link}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 whitespace-nowrap rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
