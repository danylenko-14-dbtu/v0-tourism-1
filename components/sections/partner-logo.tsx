import Image from "next/image";

interface PartnerLogoProps {
  name: string;
  logo: string;
}

export function PartnerLogo({ name, logo }: PartnerLogoProps) {
  return (
    <div
      title={name}
      aria-label={name}
      className="flex h-30 w-40 shrink-0 items-center justify-center text-muted-foreground opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-20 sm:w-56 md:w-60"
    >
      <Image
        src={logo}
        alt=""
        width={240}
        height={164}
        aria-hidden="true"
        className="h-25 w-auto object-contain dark:invert"
        loading="lazy"
        unoptimized
      />
    </div>
  );
}
