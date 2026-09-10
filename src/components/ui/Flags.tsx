import { useId } from "react";

/** Nederlandse vlag, eenvoudige driekleur. */
export function NLFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#21468B" />
      <rect width="30" height="13.34" fill="#FFFFFF" />
      <rect width="30" height="6.67" fill="#AE1C28" />
    </svg>
  );
}

/** Vlag van het Verenigd Koninkrijk (Union Jack), vereenvoudigd voor kleine UI-weergave. */
export function GBFlag({ className }: { className?: string }) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${clipId}-tl`}>
          <path d="M0,0 L15,10 L0,20 Z" />
        </clipPath>
        <clipPath id={`${clipId}-tr`}>
          <path d="M30,0 L15,10 L30,20 Z" />
        </clipPath>
        <clipPath id={`${clipId}-tt`}>
          <path d="M0,0 L15,10 L30,0 Z" />
        </clipPath>
        <clipPath id={`${clipId}-bb`}>
          <path d="M0,20 L15,10 L30,20 Z" />
        </clipPath>
      </defs>
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="4" />
      <g stroke="#CF142B" strokeWidth="1.6">
        <path d="M0,0 L30,20" clipPath={`url(#${clipId}-tl)`} />
        <path d="M0,0 L30,20" clipPath={`url(#${clipId}-bb)`} />
        <path d="M30,0 L0,20" clipPath={`url(#${clipId}-tr)`} />
        <path d="M30,0 L0,20" clipPath={`url(#${clipId}-tt)`} />
      </g>
      <rect x="12" width="6" height="20" fill="#FFFFFF" />
      <rect y="7" width="30" height="6" fill="#FFFFFF" />
      <rect x="13.2" width="3.6" height="20" fill="#CF142B" />
      <rect y="8.2" width="30" height="3.6" fill="#CF142B" />
    </svg>
  );
}
