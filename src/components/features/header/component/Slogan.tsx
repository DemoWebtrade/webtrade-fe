import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const email = import.meta.env.VITE_EMAIL_URL || "lhc021120@gmail.com";

export default function Slogan() {
  const { t } = useTranslation();

  return (
    <div className="bg-purple-base/10 h-6 flex items-center justify-center rounded overflow-hidden">
      <Marquee
        speed={50}
        pauseOnHover={true}
        className="text-xs font-medium"
        gradient={false}
      >
        <span className="mx-8">{t("slogan.detail-1")}</span>

        <span className="mx-8">
          {t("slogan.detail-2")}
          <a
            href={`mailto:${email}`}
            className="underline hover:text-purple-600 transition-colors ml-1"
          >
            {email}
          </a>
        </span>

        <span className="mx-8">{t("slogan.detail-1")}</span>

        <span className="mx-8">
          {t("slogan.detail-2")}
          <a
            href={`mailto:${email}`}
            className="underline hover:text-purple-600 transition-colors ml-1"
          >
            {email}
          </a>
        </span>
      </Marquee>
    </div>
  );
}
