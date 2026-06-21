import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div>
      <label className="block text-sm font-normal mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          id={name}
          className={`${className ?? ""} w-full px-3 py-2.5 rounded bg-bg-secondary text-sm text-content-base outline-none transition border focus:border-outline-selected ${error ? "border-red-500" : "border-outline-base"}`}
          type={
            type
              ? type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
              : "text"
          }
          {...registration}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div
            className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
}
