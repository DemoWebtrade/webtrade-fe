import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label?: string;
  required?: boolean;
  name: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
};

export default function SelectField({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  options,
  placeholder,
  className,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-normal mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={name}
        id={name}
        className={`${className ?? ""} w-full px-3 py-2.5 rounded bg-bg-secondary text-sm text-content-base outline-none transition border appearance-none cursor-pointer focus:border-outline-selected ${
          error ? "border-red-500" : "border-outline-base"
        }`}
        {...registration}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <div className="text-red-500 text-xs mt-1">{error.message}</div>
      )}
    </div>
  );
}
