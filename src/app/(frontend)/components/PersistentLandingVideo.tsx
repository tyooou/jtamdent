"use client";

import { usePathname } from "next/navigation";
import LandingVideo from "./LandingVideo";

export default function PersistentLandingVideo() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <div className={isHome ? "block" : "hidden"} aria-hidden={!isHome}>
      <LandingVideo isActive={isHome} />
    </div>
  );
}
