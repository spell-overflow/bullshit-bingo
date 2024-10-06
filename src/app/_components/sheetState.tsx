"use client";

import React, { useState } from "react";
import AboutSheet from "./aboutSheet";
import Bubble from "./bubble";

interface SheetStateProperties {
  className?: string;
}

const SheetState: React.FC<SheetStateProperties> = ({ className }) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  return (
    <div>
      <Bubble
        onClick={() => {
          setSheetOpen(!sheetOpen);
          console.log("clicked");
        }}
        className={`onHover:bg-background  ${className}`}
      />
      <AboutSheet
        sheetOpen={sheetOpen}
        onOpenChange={() => setSheetOpen(false)}
      />
    </div>
  );
};

export default SheetState;
