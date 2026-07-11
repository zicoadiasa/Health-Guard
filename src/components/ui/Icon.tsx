type IconName =
  | "flame"
  | "activity"
  | "droplet"
  | "scale"
  | "target"
  | "bell"
  | "calendar"
  | "plus"
  | "check"
  | "pencil"
  | "ruler";

type IconProps = {
  name: IconName;
  className?: string;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Icon({ name, className = "h-5 w-5" }: IconProps) {
  switch (name) {
    case "flame":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4" y1="12" x2="2" y2="12" />
          <line x1="22" y1="12" x2="20" y2="12" />
          <line x1="5.6" y1="5.6" x2="4.2" y2="4.2" />
          <line x1="19.8" y1="19.8" x2="18.4" y2="18.4" />
          <line x1="5.6" y1="18.4" x2="4.2" y2="19.8" />
          <line x1="19.8" y1="4.2" x2="18.4" y2="5.6" />
        </svg>
      );
    case "activity":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="2,12 6,12 8,6 11,18 14,4 16,12 22,12" />
        </svg>
      );
    case "droplet":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
        </svg>
      );
    case "scale":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M6 10a6 6 0 0112 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5z" />
          <path d="M10 19a2 2 0 004 0" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="16" y1="3" x2="16" y2="7" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <polyline points="5,13 10,18 19,7" />
        </svg>
      );
    case "pencil":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case "ruler":
      return (
        <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="9" y1="6" x2="12" y2="6" />
          <line x1="9" y1="10" x2="12" y2="10" />
          <line x1="9" y1="14" x2="12" y2="14" />
          <line x1="9" y1="18" x2="12" y2="18" />
        </svg>
      );
  }
}
