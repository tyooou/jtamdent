import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const localDate = new Date().getFullYear();
  return (
    <footer className="bg-black p-4 md:px-8 lg:px-16 pt-8 md:pt-12 text-sm w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-white mb-6 md:mb-8">
          {/* Quick Links */}
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3">quick links</h2>
            <div className="text-gray-400 space-y-2 flex flex-col">
              <Link href="/" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                home
              </Link>
              <Link href="/photography" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                photography
              </Link>
              <Link href="/videography" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                videography
              </Link>
            </div>
          </div>
          {/* Contact Info */}
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3">contact info</h2>
            <div className="text-gray-400 space-y-2">
              <p className="text-sm md:text-base">email:</p>
              <a 
                href="mailto:info@jtamdent.com" 
                className="hover:text-white transition-colors text-sm md:text-base block"
              >
                info@jtamdent.com
              </a>
            </div>
          </div>
          {/* Connect */}
          <div className="space-y-3 w-full max-w-xs lg:max-w-none">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3 lg:mb-3">connect</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/jtamdent/"
                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jaidyntam/"
                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Brand - full width row below on desktop */}
        <div className="w-full flex justify-center lg:justify-end items-start lg:items-center mb-6 md:mb-8">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white">jtamdent</h1>
        </div>
        
        <hr className="border-t border-gray-800 my-6 md:my-8 w-full" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-400 text-xs md:text-sm">
          <p className="text-center sm:text-left">© {localDate} jtamdent</p>
          <p className="text-center sm:text-right">
            designed with <span className="text-red-400">♡</span> by{" "}
            <a
              href="https://tyooou.github.io/tyleryoung/"
              className="hover:text-white transition-colors underline decoration-gray-600 hover:decoration-white"
            >
              tyou
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
