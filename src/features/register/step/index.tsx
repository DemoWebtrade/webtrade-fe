import { Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Step1 from "./Step1";

export default function RegisterStep() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-xl md:text-2xl font-bold py-2 md:py-4">
        {t("register.init-account")}
      </h1>
      <div className="flex flex-row gap-2 md:gap-4 mt-2 md:mt-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 md:gap-8 items-center"
          >
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                step >= index + 1 ? "bg-purple-base" : "bg-primary-disabled"
              }`}
            >
              <span className="text-sm font-medium">
                {step > index + 1 ? <Check className="size-4" /> : index + 1}
              </span>
            </div>

            {index !== 2 && (
              <div
                className={`w-10 md:w-20 h-1 rounded-2xl ${
                  step > index + 1 ? "bg-purple-base" : "bg-bg-tertiary"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && <Step1 nextStep={() => setStep(2)} />}
    </div>
  );
}
