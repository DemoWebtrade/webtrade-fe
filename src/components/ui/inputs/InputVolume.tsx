import { Minus, Plus } from "lucide-react";
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

type InputVolumeProps<TFieldValues extends FieldValues> = {
  label?: string;
  required?: boolean;
  name: FieldPath<TFieldValues>;
  error?: FieldError;
  control: Control<TFieldValues>;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
  step?: number; // số lượng tăng/giảm mỗi lần bấm, mặc định 100
};

export default function InputVolume<TFieldValues extends FieldValues>({
  label,
  required,
  name,
  error,
  control,
  disabled,
  autoComplete,
  className,
  placeholder,
  step = 100,
}: InputVolumeProps<TFieldValues>) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-normal mb-2" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => {
          const numericValue =
            value !== undefined && value !== null ? Number(value) : 0;

          const handleStep = (delta: number) => {
            if (disabled) return;
            const next = numericValue + delta;
            // không cho số âm
            onChange((next < 0 ? 0 : next) as never);
          };

          return (
            <div
              className={`flex flex-row items-center rounded border overflow-hidden ${
                error ? "border-red-500" : "border-outline-base"
              } focus-within:border-outline-selected`}
            >
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled || numericValue <= 0}
                onClick={() => handleStep(-step)}
                className="ml-0.5 px-1 py-0.5 rounded flex items-center justify-center bg-bg-secondary hover:bg-secondary-hover disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Giảm khối lượng"
              >
                <Minus className="size-3.5" />
              </button>

              <IMaskInput
                mask={Number}
                scale={0}
                thousandsSeparator=","
                radix="."
                mapToRadix={[","]}
                unmask={true}
                inputRef={ref}
                id={name}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                className={`${className ?? ""} w-full px-3 py-2.5 text-sm text-content-base outline-none bg-bg-secondary text-center min-w-0`}
                value={
                  value !== undefined && value !== null ? String(value) : ""
                }
                onAccept={(unmaskedValue: string) => {
                  onChange(
                    unmaskedValue === ""
                      ? undefined
                      : (Number(unmaskedValue) as never),
                  );
                }}
                onBlur={onBlur}
              />

              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onClick={() => handleStep(step)}
                className="mr-0.5 px-1 py-0.5 rounded flex items-center justify-center bg-bg-secondary hover:bg-secondary-hover disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Tăng khối lượng"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          );
        }}
      />

      {error && (
        <div className="text-red-500 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
}
