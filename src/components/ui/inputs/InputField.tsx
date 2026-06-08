import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  label?: string;
  required?: boolean;
  name: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
};

export default function InputField({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  type,
  autoComplete,
  className,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-normal mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        id={name}
        className={`${className ?? ""} w-full px-3 py-2.5 rounded bg-bg-secondary text-sm text-content-tertiary outline-none transition border focus:border-outline-base ${error ? "border-red-500" : "border-border"}`}
        type={type ?? "text"}
        {...registration}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error && (
        <div className="text-red-500 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
}
