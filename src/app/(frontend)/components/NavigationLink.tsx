import Link from "next/link";

export default function NavigationLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <Link href={href} className="text-white hover:text-gray-300 transition-colors duration-200">
      {text}
    </Link>
  );
}
