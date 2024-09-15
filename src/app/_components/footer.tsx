import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mx-4 mt-auto flex h-fit justify-center gap-5 rounded-t-lg bg-accent py-4">
      <Link href="/about">About Bullshit-Bingo</Link>
      <Link href="/impressum">Impressum</Link>
      <Link href="/datenschutz">Datenschutz</Link>
    </footer>
  );
};

export default Footer;
