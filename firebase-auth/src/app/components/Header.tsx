import React from "react";
import Nav from "./Nav";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full top-0 left-0 py-3 px-4 md:py-6 md:px-12 flex items-center justify-between bg-green-800">
      <Link href="/" className="text-base md:text-lg lg:text-xl">
        Firebase Auth
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
