"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { faLightbulbOn } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DarkModeProperties {
  className: string;
}

const DarkMode: React.FC<DarkModeProperties> = ({ className }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${className}`}
          variant="ghost"
          size="icon"
          onClick={() => setTheme("dark")}
        >
          <FontAwesomeIcon
            icon={faLightbulbOn}
            className="text-4xl text-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkMode;
