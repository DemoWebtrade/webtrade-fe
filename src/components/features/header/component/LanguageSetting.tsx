import en from "@/assets/imgs/flag/en.png";
import vi from "@/assets/imgs/flag/vi.png";
import type { LanguageKey } from "@/types";

export default function LanguageSetting({
  language,
  handleChangeLanguage,
}: {
  language: LanguageKey;
  handleChangeLanguage: () => void;
}) {
  return (
    <div
      className="md:h-9 h-8 p-1 rounded-2xl bg-bg-purple w-14 md:w-16 cursor-pointer group"
      onClick={handleChangeLanguage}
    >
      <div className="w-full h-full flex flex-row items-center justify-between relative">
        <div
          className={`absolute top-0 h-full w-1/2 rounded-2xl bg-purple-active group-hover:bg-purple-hover bg-switch pointer-events-none ${
            language === "vi" ? "left-1/2" : "left-0"
          }`}
        />

        <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
          <img src={en} alt={"en-flag"} className="w-4 h-4 rounded-full" />
        </div>

        <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
          <img src={vi} alt={"vi-flag"} className="w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
