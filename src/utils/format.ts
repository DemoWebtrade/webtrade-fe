import Big from "big.js";

export function numberFormat(
  input: string | number | undefined | null,
  decimals: number = 0,
  fallback: string = "",
  decimalSeparator?: string,
  thousandSeparator?: string,
): string {
  if (
    input === null ||
    input === undefined ||
    input === "" ||
    input === " " ||
    input === "-" ||
    input === 0 ||
    input === "0" ||
    input === "NaN"
  ) {
    return fallback;
  }

  // Làm sạch input
  const cleaned = String(input)
    .replace(/[,\s]/g, "") // bỏ dấu phẩy và khoảng trắng
    .replace(/[^\d.-]/g, ""); // bỏ ký tự lạ

  // Nếu cleaned chỉ còn "." hoặc "-"  invalid
  if (
    cleaned === "" ||
    cleaned === "." ||
    cleaned === "-" ||
    cleaned === "-."
  ) {
    return fallback;
  }

  let bigNum: Big;
  try {
    bigNum = new Big(cleaned);
  } catch {
    return fallback;
  }

  // Làm tròn theo decimals
  const rounded = bigNum.round(decimals, 0);

  // Tách phần integer / decimal
  const [intStr, decStr] = rounded.toString().split(".");

  const dec = decimalSeparator ?? ".";
  const thou = thousandSeparator ?? ",";

  // Format phần nguyên
  const formattedInt = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, thou);

  if (!decimals) {
    return formattedInt;
  }

  const paddedDec = (decStr ?? "").padEnd(decimals, "0");

  return `${formattedInt}${dec}${paddedDec}`;
}
