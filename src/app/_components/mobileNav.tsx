"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "~/components/ui/button";

interface NavItem {
  name: string;
  icon: IconDefinition;
}

interface NavItems {
  className: string;
  navItems: NavItem[];
}

const MobileNav: React.FC<NavItems> = ({ className, navItems }) => {
  return (
    <div className={className}>
      <div className="bottom-0 w-full rounded-t-md bg-primary py-2">
        <div className="my-1 flex text-center">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => {
                console.log("me");
              }}
              className="h-10 flex-auto"
            >
              <FontAwesomeIcon icon={item.icon} className="h-10 flex-auto" />
              {/* text-transparent/20 für inaktive Icons */}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
