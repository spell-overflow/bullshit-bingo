import Link from "next/link";
import React from "react";
import { navItems } from "./navItems";

interface FooterProperties {
  className: string;
}

const Footer: React.FC<FooterProperties> = ({ className }) => {
  return (
    <footer
      className={`mx-4 mt-auto flex h-fit justify-center gap-5 rounded-t-lg bg-card py-4 text-card-foreground shadow ${className}`}
    >
      {navItems.footer.map((item, index) => (
        <Link key={index} href={item.link} className="hover:underline">
          {item.name}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
