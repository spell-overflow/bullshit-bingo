"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import React from "react";
import { navItems } from "./navItems";
import Link from "next/link";

interface AboutSheetProperties {
  sheetOpen: boolean;
  onOpenChange: (state: boolean) => void;
}

const AboutSheet: React.FC<AboutSheetProperties> = ({
  sheetOpen,
  onOpenChange,
}) => {
  return (
    <div className={`${sheetOpen ? "block" : "hidden"}`}>
      <Sheet open={sheetOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Documents</SheetTitle>
            <SheetDescription>You find the documents here.</SheetDescription>
          </SheetHeader>
          <div className="flex-col">
            {navItems.footer.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex text-lg hover:underline"
                onClick={() => onOpenChange(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <SheetFooter />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AboutSheet;
