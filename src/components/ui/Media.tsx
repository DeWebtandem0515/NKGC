import Image from "next/image";
import clsx from "clsx";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

interface MediaProps {
  src: string | null;
  alt: string;
  placeholderLabel: string;
  aspect?: "video" | "square" | "portrait" | "wide" | "cover";
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "blue" | "green" | "sand";
  /** Uitschakelen voor full-bleed composities zonder afgeronde hoeken. */
  rounded?: boolean;
}

const aspectClasses: Record<NonNullable<MediaProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/7]",
  // "cover": geen eigen aspect-ratio — vult de hoogte van een ouder die zelf
  // al een hoogte heeft (bv. absolute inset-0 in een sectie met min-h-*).
  cover: "h-full",
};

/** Vaste aspect-ratio wrapper rond een echte foto óf de eerlijke placeholder — voorkomt layout shift. */
export function Media({
  src,
  alt,
  placeholderLabel,
  aspect = "video",
  className,
  sizes = "100vw",
  priority = false,
  tone,
  rounded = true,
}: MediaProps) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden",
        rounded && "rounded-card",
        aspectClasses[aspect],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <PhotoPlaceholder label={placeholderLabel} tone={tone} />
      )}
    </div>
  );
}
