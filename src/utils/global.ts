import { LIST_BANKS } from "@/configs";
import i18n from "@/lib/i18n";
import type { LanguageKey } from "@/types";

export function getBrowserPreferredLang(): "vi" | "en" | "other" {
  const langs = navigator.languages || [navigator.language || "en"];

  const primary = (langs[0] || "en").toLowerCase().split("-")[0];

  if (primary === "vi") return "vi";
  if (primary === "en") return "en";
  return "vi";
}

const bankLogos = import.meta.glob("/src/assets/imgs/bank/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const getBankLogo = (bankCode: string) =>
  bankLogos[`/src/assets/imgs/bank/${bankCode}.png`];

export const getBankName = (bankCode: string) => {
  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  const bank = LIST_BANKS.find((item) => item.bankCode === bankCode);
  return currentLang === "vi"
    ? bank?.bankName
    : (bank?.englishBankName ?? bank?.bankName) || "";
};
