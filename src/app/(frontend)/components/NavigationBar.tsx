"use client";

import NavigationLink from "./NavigationLink";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Logo from "./Logo";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 112; // Height of the navbar (h-28 = 112px)
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleToClick = (url: string) => {
    if (pathname === "/" || pathname === "") {
      scrollToSection(url);
    } else {
      router.push("/");
      // Add delay to wait for page navigation to complete
      setTimeout(() => {
        scrollToSection(url);
      }, 300); // 300ms delay
    }
  };

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
        <div className="flex px-12 h-full items-center relative z-10">
          <Logo isScrolled={scrolled} />
          <ul className="flex space-x-6 justify-center items-center h-full relative z-10 ml-auto">
            <li>
              <button
                onClick={() => handleToClick("about")}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                about
              </button>
            </li>
            <li>
              <button
                onClick={() => handleToClick("contact")}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                contact
              </button>
            </li>
            <NavigationLink text="photography" href="/photography" />
            <NavigationLink text="videography" href="/videography" />
          </ul>
        </div>
      </nav>
    </div>
  );
}
