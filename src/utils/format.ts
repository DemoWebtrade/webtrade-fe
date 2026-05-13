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

export function formatVolPrice(vol: number) {
  return vol >= 1e6
    ? numberFormat(vol / 1e6, 0, "") + "M"
    : vol === 0
      ? ""
      : numberFormat(vol, 0, "");
}

export const priceFormatter = (params: any) =>
  params.value ? numberFormat(params.value / 1000, 2, "") : "";
export const volFormatter = (params: any) =>
  params.value ? numberFormat(params.value, 0, "") : "";
export const changePctFormatter = (params: any) => {
  if (params.value == null) return "";

  const value = Number(params.value);
  const formatted = Math.abs(value).toFixed(2);
  return `${formatted}%`;
};

export function StringToInt(pString: string | number): number {
  pString = "" + pString;
  pString = pString.replace(/,/g, "");
  const vInt = parseInt(pString, 10);
  if (isNaN(vInt)) {
    return 0;
  } else {
    return vInt;
  }
}
