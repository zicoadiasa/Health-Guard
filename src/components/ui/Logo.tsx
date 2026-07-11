type LogoProps = {
  className?: string;
};

export default function Logo({ className = "h-8 w-8 text-red-600" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="HealthGuard logo"
    >
      <path
        d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"
        fill="currentColor"
      />
      <rect x="10.8" y="10.5" width="2.4" height="9" rx="1" fill="white" />
      <rect x="7.5" y="13.8" width="9" height="2.4" rx="1" fill="white" />
    </svg>
  );
}
