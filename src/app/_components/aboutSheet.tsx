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
            <SheetDescription>
              Make changes to your profile here. Click save when done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4"></div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AboutSheet;
