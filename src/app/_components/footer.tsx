import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface FooterProperties {
  className: string;
}

const Footer: React.FC<FooterProperties> = ({ className }) => {
  return (
    <footer
      className={clsx(
        "mx-4 mt-auto flex h-fit justify-center gap-5 rounded-t-lg bg-accent py-4",
        className,
      )}
    >
      <Link href="/about" className="hover:underline">
        About Bullshit-Bingo
      </Link>
      <Link href="/impressum" className="hover:underline">
        Impressum
      </Link>
      <Link href="/datenschutz" className="hover:underline">
        Datenschutz
      </Link>
    </footer>
  );
};

export default Footer;
