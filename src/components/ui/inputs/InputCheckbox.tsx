import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputCheckboxProps = {
  label?: string;
  required?: boolean;
  name: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  checked?: boolean;
};

export default function InputCheckbox({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  className,
  defaultChecked = false,
  checked,
}: InputCheckboxProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <input
          id={name}
          type="checkbox"
          className={`${className ?? ""} ${error ? "border-red-500" : "border-outline-base"}`}
          disabled={disabled}
          {...registration}
          {...(checked !== undefined ? { checked } : { defaultChecked })}
        />
        <label className="text-sm font-normal" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
