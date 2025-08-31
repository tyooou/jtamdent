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
    <div className="w-full h-28 bg-black">
      <nav
        className={`bg-black fixed top-0 left-1/2 z-50 transition-all duration-200`}
        style={{
          transform: "translateX(-50%)",
          width: "100%",
          height: scrolled ? "64px" : "112px", // 10% and 8% can be unpredictable, use px for consistency
          transition: "height 0.2s",
        }}
      >
        <ul className="flex space-x-4 justify-center items-center h-full">
          <li>
            <Logo />
          </li>

          <li>
            <NavigationLink text="home" href="/" />
          </li>

          <NavigationDropdown
            label="photography"
            options={["People", "Macro", "Design"]}
            onSelect={handleSelect}
          />

          <NavigationDropdown
            label="videography"
            options={["Interview", "Promotional"]}
            onSelect={handleSelect}
          />

          <li>
            <NavigationLink text="contact" href="/contact" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
