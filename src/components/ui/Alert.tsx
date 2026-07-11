type AlertVariant = "success" | "error";

const variantClasses: Record<AlertVariant, string> = {
  success: "bg-green-50 text-green-700",
  error: "bg-red-50 text-red-600",
};

type AlertProps = {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
};

export default function Alert({ variant, children, className = "" }: AlertProps) {
  return (
    <p className={`rounded px-3 py-2 text-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
}
