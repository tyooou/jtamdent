import Logo from "./Logo";
import NavigationLink from "./NavigationLink";

export default function NavigationBar() {
  return (
    <nav className="bg-black p-10">
      <ul className="flex space-x-4 justify-center items-center">
        <li>
          <Logo />
        </li>

        <li>
          <NavigationLink text="Home" href="/" />
        </li>
        <li>
          <NavigationLink text="Photography" href="/about" />
        </li>
        <li>
          <NavigationLink text="Videography" href="/about" />
        </li>
        <li>
          <NavigationLink text="Contact" href="/contact" />
        </li>
      </ul>
    </nav>
  );
}
