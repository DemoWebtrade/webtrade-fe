import { Button } from "@/components/ui/Button";
import InputDate from "@/components/ui/inputs/InputDate";
import InputField from "@/components/ui/inputs/InputField";
import SelectField from "@/components/ui/inputs/SelectField";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { registerThunk } from "@/store/modules/auth/api";
import {
  selectLoadingRegister,
  selectRegisterData,
} from "@/store/modules/auth/selector";
import { setRegisterData } from "@/store/modules/auth/slice";
import { formatDate, parseDate } from "@/utils";
import { useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Step2Form {
  fullName: string;
  birthday: Date | null;
  gender: string;
  address: string;
}

export default function Step2({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const registerData = useAppSelector(selectRegisterData);
  const loadingRegister = useAppSelector(selectLoadingRegister);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<Step2Form>();

  useEffect(() => {
    if (registerData) {
      reset({
        fullName: registerData?.fullName ?? "",
        birthday: registerData?.dateOfBirth
          ? parseDate(registerData?.dateOfBirth)
          : undefined,
        gender: registerData?.gender ?? "",
        address: registerData?.address ?? "",
      });
    }
  }, [registerData, reset]);

  const handlePrevStep = async () => {
    const currentValue = getValues();
    const { fullName, birthday, gender, address } = currentValue;

    await dispatch(
      setRegisterData({
        ...registerData,
        fullName,
        dateOfBirth: birthday ? formatDate(birthday) : "",
        gender,
        address,
      }),
    );

    prevStep();
  };

  const handleSubmitStep = async (data: Step2Form) => {
    if (loadingRegister) return;
    const { fullName, birthday, gender, address } = data;
    try {
      await dispatch(
        registerThunk({
          password: registerData?.password ?? "",
          email: registerData?.email ?? "",
          fullName,
          dateOfBirth: birthday ? formatDate(birthday) : "",
          gender,
          address,
          phone: registerData?.phone ?? "",
        }),
      ).unwrap();
      dispatch(
        setRegisterData({
          ...registerData,
          fullName,
          dateOfBirth: birthday ? formatDate(birthday) : "",
          gender,
          address,
        }),
      );
      nextStep();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 w-full h-full mt-4 md:mt-8">
      <form
        onSubmit={handleSubmit(handleSubmitStep)}
        className="grid md:grid-cols-2 grid-cols-1 items-center gap-2 md:gap-6 xl:w-1/2 md:px-30 px-8 w-full"
      >
        <div className="col-span-1">
          <InputField
            name="fullName"
            type="text"
            autoComplete="off"
            registration={register("fullName", {
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
            error={errors?.fullName as FieldError}
            placeholder={t("input.fullname-placeholder")}
            className="h-10!"
            label={t("full-name")}
            required
          />
        </div>
        <div className="col-span-1">
          <InputDate
            name="birthday"
            control={control}
            rules={{ required: t("validate.birthday-required") }}
            error={errors?.birthday as FieldError}
            placeholder={t("input.date-placeholder")}
            className="h-10!"
            label={t("birthday")}
            required
          />
        </div>
        <div className="col-span-1">
          <SelectField
            name="gender"
            options={[
              { label: t("male"), value: "MALE" },
              { label: t("female"), value: "FEMALE" },
            ]}
            placeholder={t("input.gender-placeholder")}
            registration={register("gender", {
              required: t("validate.gender-required"),
            })}
            error={errors.gender as FieldError}
            label={t("gender")}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <InputField
            name="address"
            type="text"
            autoComplete="off"
            registration={register("address", {
              required: t("validate.address-required"),
            })}
            error={errors?.address as FieldError}
            className="h-10!"
            placeholder={t("input.address-placeholder")}
            label={t("address")}
            required
          />
        </div>
        <div className="flex flex-row-reverse gap-2 col-span-1">
          <Button
            className="w-1/2"
            isLoading={loadingRegister}
            disabled={loadingRegister}
          >
            {t("register.title")}
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={handlePrevStep}
            className="w-1/2"
          >
            {t("button.previous")}
          </Button>{" "}
        </div>
      </form>
    </div>
  );
}
