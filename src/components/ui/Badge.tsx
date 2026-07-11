type BadgeVariant = "success" | "warning" | "neutral" | "danger";

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-700",
  warning: "bg-orange-100 text-orange-700",
  neutral: "bg-gray-100 text-gray-500",
  danger: "bg-red-600 text-white",
};

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
};

export default function Badge({
  variant = "neutral",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
