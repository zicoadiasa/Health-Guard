import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
