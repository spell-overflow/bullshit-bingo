import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mx-3.5 my-4 mt-auto flex h-fit justify-center gap-5 rounded-t-lg bg-accent py-4">
      <Link href="/impressum">Impressum</Link>
    </footer>
  );
};

export default Footer;
