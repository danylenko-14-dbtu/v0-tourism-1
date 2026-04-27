"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface HomeLogoLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function HomeLogoLink({ href, className, children }: HomeLogoLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== href) {
      return;
    }

    event.preventDefault();

    const topAnchor = document.getElementById("top");

    if (topAnchor) {
      topAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
