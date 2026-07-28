import { LIST_STOCKS, MARKET_TYPE } from "@/configs";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

type InputPriceProps<TFieldValues extends FieldValues> = {
  label?: string;
  required?: boolean;
  name: FieldPath<TFieldValues>;
  error?: FieldError;
  control: Control<TFieldValues>;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
  symbol?: string;
};

export default function InputPrice<TFieldValues extends FieldValues>({
  label,
  required,
  name,
  error,
  control,
  disabled,
  autoComplete,
  className,
  placeholder,
  symbol,
}: InputPriceProps<TFieldValues>) {
  const [isChecked, setIsChecked] = useState(false);

  const stock = LIST_STOCKS?.find((s) => s?.code === symbol);
  const market =
    stock?.type === "i" ? "UPCOM" : (stock?.exchange.toLocaleUpperCase() ?? "");

  const step = market === "HOSE" ? 0.05 : 0.1;
  const decimalPlaces = market === "HOSE" ? 2 : 1;

  const roundToStep = (val: number) => Math.round(val / step) * step;

  return (
    <div className="flex flex-col gap-1">
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
              const next = roundToStep(numericValue + delta);
              const clamped = next < 0 ? 0 : next;
              // ép về đúng số chữ số thập phân, tránh dư số lẻ do float
              onChange(Number(clamped.toFixed(decimalPlaces)) as never);
            };

            return (
              <>
                {isChecked ? (
                  <div
                    className={`${className ?? ""} cursor-pointer w-full rounded border border-outline-base text-sm text-content-base outline-none bg-bg-secondary text-center min-w-0`}
                    onClick={() => {
                      setIsChecked(false);
                      onChange("");
                    }}
                  >
                    {value}
                  </div>
                ) : (
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
                      aria-label="Giảm giá"
                    >
                      <Minus className="size-3.5" />
                    </button>

                    <IMaskInput
                      mask={Number}
                      scale={decimalPlaces}
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
                        value !== undefined && value !== null
                          ? String(value)
                          : ""
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
                      aria-label="Tăng giá"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                )}

                {symbol && (
                  <div className="text-sm text-content-base flex flex-wrap gap-2 mt-1">
                    {(MARKET_TYPE?.[market] ?? [])?.map((m) => (
                      <div
                        key={m}
                        onClick={() => {
                          if (disabled) return;
                          onChange(m as never);
                          setIsChecked(true);
                        }}
                        className="py-1 px-2 bg-secondary-base hover:bg-secondary-hover rounded flex-1 flex items-center justify-center cursor-pointer"
                      >
                        <span className="leading-none">{m}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          }}
        />

        {error && (
          <div className="text-red-500 text-xs mt-1">{error?.message}</div>
        )}
      </div>
    </div>
  );
}
