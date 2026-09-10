import clsx from "clsx";
import type { ReactNode } from "react";

interface EditorialSplitProps {
  media: ReactNode;
  children: ReactNode;
  /** Spiegelt de compositie: beeld rechts, tekstpaneel overlapt naar rechts. */
  reverse?: boolean;
  panelTone?: "white" | "navy";
  className?: string;
}

/**
 * De centrale compositie-primitief van deze redesign: een groot beeldvlak
 * (7/12) met een tekstpaneel (5/12) dat er op desktop overheen schuift via
 * een negatieve marge. Dat overlappende paneel — in plaats van twee nette,
 * gelijke kolommen — is wat een sectie een "maatwerk"-gevoel geeft in
 * plaats van een generieke SaaS-tweedeling. Op mobiel stapelt dit gewoon:
 * beeld boven, paneel eronder, geen negatieve marges (voorkomt overflow).
 */
export function EditorialSplit({
  media,
  children,
  reverse = false,
  panelTone = "white",
  className,
}: EditorialSplitProps) {
  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row lg:items-center",
        reverse && "lg:flex-row-reverse",
        className
      )}
    >
      <div className="lg:w-7/12">{media}</div>
      <div
        className={clsx(
          "relative z-10 lg:w-5/12",
          reverse ? "lg:-mr-20 xl:-mr-28" : "lg:-ml-20 xl:-ml-28"
        )}
      >
        <div
          className={clsx(
            "p-8 sm:p-10 lg:p-14",
            panelTone === "white" ? "bg-white" : "bg-nkgc-blue-900 text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
