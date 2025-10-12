import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const localDate = new Date().getFullYear();
  return (
    <footer className="bg-black p-4 md:px-8 lg:px-16 pt-8 md:pt-12 text-sm w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-white mb-6 md:mb-8">
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3">quick links</h2>
            <div className="text-gray-400 space-y-2 flex flex-col">
              <a href="/" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                home
              </a>
              <a href="/about" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                about me
              </a>
              <a href="/photography" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                photography
              </a>
              <a href="/videography" className="hover:text-white transition-colors py-1 text-sm md:text-base">
                videography
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3">contact info</h2>
            <div className="text-gray-400 space-y-2">
              <p className="text-sm md:text-base">email:</p>
              <a 
                href="mailto:info@jtamdent.com" 
                className="hover:text-white transition-colors py-1 text-sm md:text-base block"
              >
                info@jtamdent.com
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-base md:text-lg mb-3">connect</h2>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/jtamdent/"
                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/jaidyntam/"
                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
          
          {/* Brand section - spans full width on mobile, right column on desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex justify-center lg:justify-end items-start lg:items-center">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-4 lg:mt-0">jtamdent</h1>
          </div>
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
