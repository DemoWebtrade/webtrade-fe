import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type {
  Control,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

registerLocale("vi", vi);
registerLocale("en", enUS);

type InputDateProps<T extends FieldValues> = {
  label?: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  rules?: RegisterOptions<T, Path<T>>;
};

export default function InputDate<T extends FieldValues>({
  label,
  required,
  name,
  control,
  error,
  disabled,
  className,
  placeholder = "DD/MM/YYYY",
  minDate,
  maxDate,
  dateFormat = "dd/MM/yyyy",
  rules,
}: InputDateProps<T>) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const currentLocale = i18n.language.startsWith("vi") ? "vi" : "en";

  const renderDayContents = (day: number, date: Date) => {
    const dayOfWeek = date.getDay(); // 0 = CN, 6 = T7
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;

    return (
      <span className={`${isSunday || isSaturday ? "text-red-base" : ""}`}>
        {day}
      </span>
    );
  };

  return (
    <div>
      <label className="block text-sm font-normal mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, onBlur } }) => (
          <DatePicker
            id={name}
            selected={value ? new Date(value) : null}
            onChange={(date: Date | null) => onChange(date)}
            onBlur={onBlur}
            disabled={disabled}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            autoComplete="off"
            locale={currentLocale}
            calendarStartDay={1}
            renderDayContents={renderDayContents}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
              const monthText =
                currentLocale === "vi"
                  ? `Tháng ${format(date, "MM")}, ${format(date, "yyyy")}`
                  : format(date, "MMMM yyyy", { locale: enUS });

              return (
                <div className="flex justify-between items-center p-2 text-content-primary! text-sm">
                  <span>{monthText}</span>
                  <div className="flex flex-row items-center gap-2 md:gap-6">
                    <div
                      className="cursor-pointer hover:text-purple-base"
                      onClick={decreaseMonth}
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("pre-month")}
                    >
                      <ChevronLeft />
                    </div>
                    <div
                      className="cursor-pointer hover:text-purple-base"
                      onClick={increaseMonth}
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("next-month")}
                    >
                      <ChevronRight />
                    </div>
                  </div>
                </div>
              );
            }}
            formatWeekDay={(nameOfDay) => {
              if (currentLocale === "vi") {
                const viDays: Record<string, string> = {
                  "thứ hai": "T2",
                  "thứ ba": "T3",
                  "thứ tư": "T4",
                  "thứ năm": "T5",
                  "thứ sáu": "T6",
                  "thứ bảy": "T7",
                  "chủ nhật": "CN",
                };
                return viDays[nameOfDay.toLowerCase()] ?? nameOfDay;
              }

              return nameOfDay.slice(0, 2);
            }}
            wrapperClassName="w-full"
            className={`${className ?? ""} w-full px-3 py-2.5 rounded bg-bg-secondary text-sm text-content-base outline-none transition border focus:border-outline-selected ${
              error ? "border-red-500" : "border-outline-base"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        )}
      />

      {error && (
        <div className="text-red-500 text-xs mt-1">{error.message}</div>
      )}
    </div>
  );
}
