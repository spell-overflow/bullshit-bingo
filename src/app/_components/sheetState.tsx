"use client";

import React, { useState } from "react";
import AboutSheet from "./aboutSheet";
import { Button } from "~/components/ui/button";

const SheetState: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => setSheetOpen(!sheetOpen)}
        className="mb-2 w-full sm:hidden"
      >
        more Information
      </Button>
      <AboutSheet
        sheetOpen={sheetOpen}
        onOpenChange={() => setSheetOpen(false)}
      />
    </div>
  );
};

export default SheetState;
