"use client";

import Logo from "./Logo";
import NavigationDropdown from "./NavigationDropdown";
import NavigationLink from "./NavigationLink";
import { useEffect, useState } from "react";

const handleSelect = (value: string) => {
  console.log("Selected:", value);
};

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-28 bg-black">
      <nav
        className="bg-black fixed top-0 left-1/2 z-50 transition-all duration-200 overflow-hidden"
        style={{
          transform: "translateX(-50%)",
          width: "100%",
          height: scrolled ? "64px" : "112px",
          transition: "height 0.2s",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>
        <ul className="flex space-x-4 justify-center items-center h-full relative z-10">
          <li>
            <NavigationLink text="about" href="/about" />
          </li>
          <li>
            <NavigationLink text="contact" href="/contact" />
          </li>
          <li>
            <Logo />
          </li>
          <li>
            <NavigationLink text="photography" href="/photography" />
          </li>
          <li>
            <NavigationLink text="videography" href="/videography" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
