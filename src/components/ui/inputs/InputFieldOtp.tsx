import type { UseFormRegisterReturn } from "react-hook-form";

type InputFieldOTPProps = {
  length?: number;
  onChange?: (value: string) => void;
  registration?: UseFormRegisterReturn;
  className?: string;
  placeholder?: string;
};

export default function InputFieldOtp({
  length = 6,
  registration,
  className,
  placeholder,
}: InputFieldOTPProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Cho phép các phím điều hướng, backspace, delete
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (allowedKeys.includes(e.key)) return;

    // Nếu không phải số thì chặn nhập
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // chỉ giữ lại số
    if (val.length > length) val = val.slice(0, length);

    // Cập nhật lại giá trị input khi người dùng paste
    e.target.value = val;

    registration?.onChange?.(e);
  };

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        maxLength={length}
        autoComplete="off"
        {...registration}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className={`${
          className ?? ""
        } w-full sm:tracking-[1em] tracking-[.8em] px-3 py-2.5 rounded bg-bg-secondary text-xl text-content-base outline-none transition border border-border focus:border-outline-selected`}
        autoFocus
        placeholder={placeholder}
      />
    </>
  );
}
