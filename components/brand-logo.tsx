import Image from "next/image";
import { HomeLogoLink } from "@/components/home-logo-link";

interface BrandLogoProps {
  href: string;
  label: string;
  title: string;
  className?: string;
  textClassName?: string;
  imageClassName?: string;
  variant?: "default" | "split";
}

export function BrandLogo({
  href,
  label,
  title,
  className,
  textClassName,
  imageClassName,
  variant = "default",
}: BrandLogoProps) {
  const renderLabel = () => {
    if (variant === "split") {
      return <span className={`text-base font-semibold leading-none ${textClassName ?? ""}`}>{label}</span>;
    }
    return <span className={textClassName}>{label}</span>;
  };

  return (
    <HomeLogoLink href={href} className={className}>
      <span title={title} className="relative flex h-[42px] w-[42px] shrink-0 overflow-hidden rounded-lg">
        <Image
          src="/dbtu-logo.png"
          alt={label}
          fill
          priority
          sizes="50px"
          className={`object-contain dark:hidden ${imageClassName ?? ""}`}
        />
        <Image
          src="/dbtu-logo.png"
          alt={label}
          fill
          priority
          sizes="50px"
          className={`hidden object-contain dark:block ${imageClassName ?? ""}`}
        />
      </span>
      {renderLabel()}
    </HomeLogoLink>
  );
}
