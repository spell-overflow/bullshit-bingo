"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { navItems } from "./navItems";

interface MobileNavProperties {
  className: string;
}

const MobileNav: React.FC<MobileNavProperties> = ({ className }) => {
  return (
    <div className={className}>
      <div className="bottom-0 w-full rounded-t-md bg-card py-2">
        <div className="my-1 flex text-center">
          {navItems.navBar.map((item, index) => (
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
