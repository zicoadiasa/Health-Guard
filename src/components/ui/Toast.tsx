type ToastVariant = "success" | "error";

const variantClasses: Record<ToastVariant, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};

type ToastProps = {
  variant?: ToastVariant;
  message: string;
};

/**
 * Presentational only. Not yet wired to a provider/state manager —
 * mounting this globally (e.g. in the root layout with a useToast hook)
 * is a deliberate follow-up, not done here.
 */
export default function Toast({ variant = "success", message }: ToastProps) {
  return (
    <div
      role="status"
      className={`fixed right-4 bottom-4 z-50 rounded px-4 py-3 text-sm shadow-lg ${variantClasses[variant]}`}
    >
      {message}
    </div>
  );
}
