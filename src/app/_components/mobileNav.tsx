"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { navItems } from "./navItems";
import { useState } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface MobileNavProperties {
  className: string;
}

const MobileNav: React.FC<MobileNavProperties> = ({ className }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [openDrawerName, setOpenDrawerName] = useState<string | null>(null);

  return (
    <div className={className}>
      <div className="bottom-0 w-full rounded-t-md bg-card py-2">
        <div className="my-1 flex text-center">
          {navItems.navBar.map((item, index) =>
            item.subItems ? (
              <Drawer
                key={index}
                open={drawerOpen && item.name === openDrawerName}
                onOpenChange={(open) => {
                  setDrawerOpen(open);
                  setOpenDrawerName(open ? item.name : null);
                }}
              >
                <DrawerTrigger asChild>
                  <button className="h-10 flex-auto">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="h-10 flex-auto"
                    />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{item.name}</DrawerTitle>
                    <DrawerDescription />
                  </DrawerHeader>
                  <div className="flex flex-col space-y-4 p-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.link}
                        className="block select-none space-y-1 rounded-md p-3 text-lg leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setDrawerOpen(false)}
                      >
                        <div className="text-sm font-medium leading-none">
                          {subItem.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Link key={index} href={item.link} className="h-10 flex-auto">
                <FontAwesomeIcon icon={item.icon} className="h-10 flex-auto" />
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
