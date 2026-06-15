import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectRegisterData } from "@/store/modules/auth/selector";
import { setRegisterData } from "@/store/modules/auth/slice";
import { useEffect, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Step1Form {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Step1({ nextStep }: { nextStep: () => void }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Step1Form>();

  const registerData = useAppSelector(selectRegisterData);

  const [checkPolicy, setCheckPolicy] = useState(false);

  useEffect(() => {
    if (registerData) {
      reset({
        phone: registerData.phone ?? "",
        email: registerData.email ?? "",
        password: registerData.password ?? "",
        confirmPassword: registerData.password ?? "",
      });
    }
  }, [registerData, reset]);

  const handleSubmitStep = (data: Step1Form) => {
    nextStep();
    dispatch(setRegisterData({ ...registerData, ...data }));
  };

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 w-full h-full mt-4 md:mt-8">
      <form
        onSubmit={handleSubmit(handleSubmitStep)}
        className="grid md:grid-cols-2 grid-cols-1 items-center gap-2 md:gap-6 xl:w-1/2 md:px-30 px-8 w-full"
      >
        <div className="col-span-1">
          <label htmlFor="phone">{t("phone-number")}</label>
          <InputField
            name="phone"
            type="text"
            autoComplete="off"
            registration={register("phone", {
              required: t("validate.phone-required"),
              pattern: {
                value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: t("validate.phone-incorrect"),
              },
              minLength: {
                value: 10,
                message: t("validate.phone-incorrect"),
              },
              maxLength: {
                value: 10,
                message: t("validate.phone-incorrect"),
              },
            })}
            error={errors?.phone as FieldError}
            placeholder={t("input.phone-placeholder")}
            className="h-8! md:h-10!"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="email">{t("Email")}</label>
          <InputField
            name="email"
            type="text"
            autoComplete="off"
            registration={register("email", {
              required: t("validate.email-required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("validate.email-incorrect"),
              },
            })}
            error={errors?.email as FieldError}
            className="h-8! md:h-10!"
            placeholder={t("input.email-placeholder")}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="password">{t("password")}</label>
          <InputField
            name="password"
            type="password"
            autoComplete="off"
            registration={register("password", {
              required: t("validate.password-required"),
            })}
            error={errors?.password as FieldError}
            className="h-8! md:h-10!"
            placeholder={t("input.password-placeholder")}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="confirmPassword">{t("confirm-password")}</label>
          <InputField
            name="confirmPassword"
            type="password"
            autoComplete="off"
            registration={register("confirmPassword", {
              required: t("validate.password-required"),
              validate: (value) =>
                value === getValues("password") ||
                t("validate.password-not-match"),
            })}
            error={errors?.confirmPassword as FieldError}
            className="h-8! md:h-10!"
            placeholder={t("input.confirm-placeholder")}
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-row items-center">
          <input
            type="checkbox"
            id="policy"
            name="policy"
            checked={checkPolicy}
            onChange={(e) => setCheckPolicy(e.target.checked)}
          ></input>
          <label htmlFor="policy" className="ml-2 text-sm">
            {t("register.agreement_prefix")}{" "}
            <span className="font-medium text-blue-base hover:underline hover:text-blue-hover">
              {t("register.terms")}
            </span>{" "}
            {t("register.agreement_and")}{" "}
            <span className="font-medium text-blue-base hover:underline hover:text-blue-hover">
              {t("register.privacy")}
            </span>{" "}
            {t("register.agreement_suffix")}
          </label>
        </div>

        <Button disabled={!checkPolicy}>{t("button.continue")}</Button>
      </form>
    </div>
  );
}
