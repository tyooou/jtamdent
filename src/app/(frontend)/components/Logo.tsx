import Link from "next/link";
import React from "react";

interface LogoProps {
  isScrolled: boolean;
}

export default function Logo({ isScrolled }: LogoProps) {
  return (
    <Link
      className={`text-white transition-all duration-300 ease-in-out ${isScrolled ? "text-2xl" : "text-3xl"}`}
      href="/"
    >
      <h1 className="font-bold">jtamdent</h1>
    </Link>
  );
}
