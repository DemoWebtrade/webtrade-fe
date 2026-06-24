import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  selectProfile,
  selectTypeUpdateProfile,
} from "@/store/modules/auth/selector";
import { setTypeUpdateProfile } from "@/store/modules/auth/slice";
import { PenLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import ChangeInforModal from "./ChangeInforModal";

export default function GenInformation() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const typeUpdateProfile = useAppSelector(selectTypeUpdateProfile);

  const profile = useAppSelector(selectProfile);

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:mt-3 mt-1 h-full w-full">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-sm p-2 md:p-3 bg-purple-base/20 flex items-center">
          {t("user.account-info")}
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 px-2 md:px-4">
          <div className="flex flex-col col-span-2 gap-1">
            <span className="text-sm">{t("user.account-name")}</span>
            <span className="font-medium text-base">
              {profile?.fullName.toLocaleUpperCase() ?? "-"}
            </span>
          </div>
          <div className="flex flex-col col-span-1 gap-1">
            <span className="text-sm">{t("gender")}</span>
            <span className="font-medium text-base">
              {profile?.gender === "MALE" ? "Nam" : "Nữ"}
            </span>
          </div>
          <div className="flex flex-col col-span-1 gap-1">
            <span className="text-sm">{t("birthday")}</span>
            <span className="font-medium text-base">
              {profile?.dateOfBirth}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-sm p-2 md:p-3 bg-purple-base/20 flex items-center">
          {t("user.account-lh")}
        </div>

        <div className="grid grid-cols-1 gap-2 md:gap-3 px-2 md:px-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm">{t("phone-number")}</span>
              <span className="font-medium text-base">
                {profile?.phone ?? "-"}
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setTypeUpdateProfile("PHONE"))}
              data-tooltip-id="global-tooltip"
              data-tooltip-content={t("user.phone-edit")}
            >
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm">{t("email")}</span>
              <span className="font-medium text-base">
                {profile?.email ?? "-"}
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setTypeUpdateProfile("EMAIL"))}
              data-tooltip-id="global-tooltip"
              data-tooltip-content={t("user.email-edit")}
            >
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm">{t("address")}</span>
              <span className="font-medium text-base">
                {profile?.address ?? "-"}
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setTypeUpdateProfile("ADDRESS"))}
              data-tooltip-id="global-tooltip"
              data-tooltip-content={t("user.address-edit")}
            >
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>
        </div>
      </div>
      <ChangeInforModal
        isOpen={!!typeUpdateProfile}
        type={typeUpdateProfile ?? ""}
        onClose={() => dispatch(setTypeUpdateProfile(""))}
      />
    </div>
  );
}
