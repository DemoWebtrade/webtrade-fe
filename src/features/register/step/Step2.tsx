import { Button } from "@/components/ui/Button";
import InputDate from "@/components/ui/inputs/InputDate";
import InputField from "@/components/ui/inputs/InputField";
import SelectField from "@/components/ui/inputs/SelectField";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Step2({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const handleSubmitStep = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 w-full h-full mt-4 md:mt-8">
      <form
        onSubmit={handleSubmit(handleSubmitStep)}
        className="grid md:grid-cols-2 grid-cols-1 items-center gap-2 md:gap-6 xl:w-1/2 md:px-30 px-8 w-full"
      >
        <div className="col-span-1">
          <label htmlFor="fullname">{t("Họ và tên")}</label>
          <InputField
            name="fullname"
            type="text"
            autoComplete="off"
            registration={register("fullname", {
              required: t("validate.fullname-required"),
              minLength: {
                value: 2,
                message: t("validate.fullname-incorrect"),
              },
              maxLength: {
                value: 60,
                message: t("validate.fullname-incorrect"),
              },
            })}
            error={errors?.fullname as FieldError}
            placeholder={t("input.fullname-placeholder")}
            className="h-8! md:h-10!"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="birthDay">{t("Ngày sinh")}</label>
          <InputDate
            name="birthday"
            control={control}
            rules={{ required: t("validate.birthday-required") }}
            error={errors?.birthday as FieldError}
            placeholder={t("input.date-placeholder")}
            className="h-8! md:h-10!"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="gender">{t("Giới tính")}</label>
          <SelectField
            name="gender"
            options={[
              { label: "Nam", value: "male" },
              { label: "Nữ", value: "female" },
            ]}
            placeholder="Chọn giới tính..."
            registration={register("gender", {
              required: t("validate.gender-required"),
            })}
            error={errors.gender as FieldError}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="address">{t("Địa chỉ liên hệ")}</label>
          <InputField
            name="address"
            type="text"
            autoComplete="off"
            registration={register("address", {
              required: t("validate.address-required"),
            })}
            error={errors?.address as FieldError}
            className="h-8! md:h-10!"
            placeholder={t("input.address-placeholder")}
          />
        </div>
        <div className="flex flex-row-reverse gap-2 col-span-1 md:col-span-2">
          <Button>{t("register.title")}</Button>
          <Button variant="none" onClick={prevStep}>
            {t("button.previous")}
          </Button>
        </div>
      </form>
    </div>
  );
}
