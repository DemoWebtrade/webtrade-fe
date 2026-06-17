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

// Helper lấy logo theo bank code
export const getBankLogo = (bankCode: string) =>
  bankLogos[`/src/assets/imgs/bank/${bankCode}.png`];
