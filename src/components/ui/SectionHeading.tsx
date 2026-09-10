import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-2 text-sm font-semibold uppercase tracking-wide",
            tone === "dark" ? "text-nkgc-green-700" : "text-nkgc-green-500"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={clsx(
          "text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]",
          tone === "dark" ? "text-nkgc-blue-900" : "text-white"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={clsx(
            "mt-5 text-lg leading-relaxed sm:text-xl",
            tone === "dark" ? "text-nkgc-blue-700" : "text-nkgc-blue-100"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
