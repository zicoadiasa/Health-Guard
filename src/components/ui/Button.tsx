import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-red-600 text-white hover:bg-red-700",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  danger:
    "bg-white text-red-600 border border-red-600 hover:bg-red-50",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-5 py-3 text-sm font-medium disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
