import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const localDate = new Date().getFullYear();
  return (
    <footer className="bg-black p-4 flex flex-col pl-50 pr-50 pt-25 text-sm bottom-0 w-full">
      <div className="flex text-white space-x-10 md:space-x-20 lg:space-x-40 mb-4 flex-wrap">
        <div>
          <h1 className="mb-2">quick links</h1>
          <div className="text-gray-500 space-y-2 flex flex-col">
            <a href="/" className="hover:text-gray-300">
              home
            </a>
            <a href="/about" className="hover:text-gray-300">
              about me
            </a>
            <a href="/photography" className="hover:text-gray-300">
              photography
            </a>
            <a href="/videography" className="hover:text-gray-300">
              videography
            </a>
          </div>
        </div>
        <div>
          <h1 className="mb-2">contact info</h1>
          <p className="text-gray-500">
            email:
            <br />
            <a href="mailto:info@jtamdent.com" className="hover:text-gray-300">
              info@jtamdent.com
            </a>
          </p>
        </div>
        <div>
          <h1 className="mb-2">connect</h1>
          <div className="flex space-x-2">
            <a
              href="https://www.instagram.com/jtamdent/"
              className="flex items-center"
            >
              <Instagram name="instagram" className="w-4 h-4" color="#6B7280" />
            </a>
            <a
              href="https://www.linkedin.com/in/jaidyntam/"
              className="flex items-center"
            >
              <Linkedin name="linkedin" className="w-4 h-4" color="#6B7280" />
            </a>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-800 my-2 w-full" />
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2 text-gray-500">
        <p className="md:text-left w-full">© {localDate} jtamdent</p>
        <p className="md:text-right w-full">
          designed with ♡ by{" "}
          <a
            href="https://tyooou.github.io/tyleryoung/"
            className="hover:text-gray-300"
          >
            tyou
          </a>
        </p>
      </div>
    </footer>
  );
}
