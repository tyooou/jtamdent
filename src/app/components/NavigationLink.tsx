import Link from "next/link";

export default function NavigationLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <li className="text-white hover:text-gray-300">
      <Link href={href}>{text}</Link>
    </li>
  );
}
