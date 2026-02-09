import Link from "next/link";

export default function NavigationLink({
  text,
  href,
  onClick,
}: {
  text: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-white hover:text-gray-300 transition-colors duration-200"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
