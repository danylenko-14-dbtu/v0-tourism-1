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
      const [first, ...rest] = label.split(" ");
      console.log({ first, rest });
      return (
        <span className={`flex flex-col ${textClassName ?? ""}`}>
          <span className="text-xl leading-tight font-bold tracking-wider">{first}</span>
          {rest.length > 0 && (
            <span className="text-base leading-tight font-semibold"> {rest.join(" ")}</span>
          )}
        </span>
      );
    }
    return <span className={textClassName}>{label}</span>;
  };

  return (
    <HomeLogoLink href={href} className={className}>
      <span title={title} className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-xl">
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
          sizes="40px"
          className={`hidden object-contain dark:block ${imageClassName ?? ""}`}
        />
      </span>
      {renderLabel()}
    </HomeLogoLink>
  );
}
