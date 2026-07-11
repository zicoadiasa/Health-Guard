type ProgressBarProps = {
  value: number;
  className?: string;
  colorClassName?: string;
};

export default function ProgressBar({
  value,
  className = "",
  colorClassName = "bg-red-600",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}
    >
      <div
        className={`h-full rounded-full ${colorClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
