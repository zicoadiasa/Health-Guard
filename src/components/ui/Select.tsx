import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export default function Select({
  label,
  id,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        className={`w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
