import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputCheckboxProps = {
  label?: string;
  required?: boolean;
  name: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
};

export default function InputCheckbox({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  className,
  checked = false,
}: InputCheckboxProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <input
          name={name}
          id={name}
          className={`${className ?? ""} ${error ? "border-red-500" : "border-outline-base"}`}
          type="checkbox"
          {...registration}
          disabled={disabled}
          checked={checked}
        />
        <label className="text-sm font-normal" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
}
