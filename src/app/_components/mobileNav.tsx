"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavItem {
  name: string;
  icon: IconDefinition;
  link: string;
}

interface NavItems {
  className: string;
  navItems: NavItem[];
}

const MobileNav: React.FC<NavItems> = ({ className, navItems }) => {
  return (
    <div className={className}>
      <div className="bottom-0 w-full rounded-t-md bg-card py-2">
        <div className="my-1 flex text-center">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link} className="h-10 flex-auto">
              <FontAwesomeIcon
                icon={item.icon}
                className="h-10 flex-auto"
              ></FontAwesomeIcon>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
