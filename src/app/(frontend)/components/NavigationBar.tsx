"use client";

import NavigationLink from "./NavigationLink";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Logo from "./Logo";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element && typeof window !== 'undefined') {
    const navbarHeight = window.innerWidth < 768 ? 64 : 112; // Mobile: 64px, Desktop: 112px
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleToClick = (url: string) => {
    setMobileMenuOpen(false); // Close mobile menu when clicking a link
    if (pathname === "/" || pathname === "") {
      scrollToSection(url);
    } else {
      router.push("/");
      // Use requestAnimationFrame to ensure layout is stable before scrolling
      setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        setScrolled(window.scrollY >= 40);
        requestAnimationFrame(() => {
          scrollToSection(url);
        });
      }, 350);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    // Set initial values
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="h-16 md:h-28 bg-black">
      <nav
        className="bg-black fixed top-0 left-0 w-full z-50 transition-all duration-200"
        style={{
          width: "100%",
          height: scrolled ? "64px" : isMobile ? "64px" : "112px",
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
        <div className="flex px-4 md:px-12 h-full items-center relative z-10">
          <Logo isScrolled={scrolled} />
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 justify-center items-center h-full relative z-10 ml-auto">
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
            <li>
              <NavigationLink text="photography" href="/photography" />
            </li>
            <li>
              <NavigationLink text="videography" href="/videography" />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto text-white p-3 relative z-20 cursor-pointer focus:outline-none rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="flex flex-col space-y-2 p-6 pb-8">
            <button
              onClick={() => handleToClick("about")}
              className="text-white hover:text-gray-300 active:text-gray-400 cursor-pointer text-left py-4 text-lg font-medium transition-colors duration-200 border-b border-gray-800 border-opacity-50"
            >
              about
            </button>
            <button
              onClick={() => handleToClick("contact")}
              className="text-white hover:text-gray-300 active:text-gray-400 cursor-pointer text-left py-4 text-lg font-medium transition-colors duration-200 border-b border-gray-800 border-opacity-50"
            >
              contact
            </button>
            <div className="py-4 border-b border-gray-800 border-opacity-50">
              <NavigationLink text="photography" href="/photography" />
            </div>
            <div className="py-4">
              <NavigationLink text="videography" href="/videography" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
