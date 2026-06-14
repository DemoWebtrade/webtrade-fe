import { useAppSelector } from "@/store/hook";
import { selectProfile } from "@/store/modules/auth/selector";
import { formatDate } from "@/utils";
import { PenLine } from "lucide-react";

export default function GenInformation() {
  const profile = useAppSelector(selectProfile);

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:mt-3 mt-1">
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-sm p-2 md:p-3 bg-purple-base/20">
          Thông tin cá nhân
        </h1>

        <div className="grid grid-cols-2 gap-2 md:gap-3 px-2 md:px-4">
          <div className="flex flex-col col-span-2 gap-1">
            <span className="text-xs">Tên pháp lý</span>
            <span className="font-semibold text-sm">
              {profile?.fullName.toLocaleUpperCase() ?? "-"}
            </span>
          </div>
          <div className="flex flex-col col-span-1 gap-1">
            <span className="text-xs">Giới tính</span>
            <span className="font-semibold text-sm">
              {profile?.gender === "MALE" ? "Nam" : "Nữ"}
            </span>
          </div>
          <div className="flex flex-col col-span-1 gap-1">
            <span className="text-xs">Ngày sinh</span>
            <span className="font-semibold text-sm">
              {formatDate(profile?.dateOfBirth as Date)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-sm p-2 md:p-3 bg-purple-base/20">
          Thông tin liên hệ
        </h1>

        <div className="grid grid-cols-1 gap-2 md:gap-3 px-2 md:px-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs">Số điện thoại</span>
              <span className="font-semibold text-sm">
                {profile?.phone ?? "-"}
              </span>
            </div>
            <div className="cursor-pointer">
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs">Email</span>
              <span className="font-semibold text-sm">
                {profile?.email ?? "-"}
              </span>
            </div>
            <div className="cursor-pointer">
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs">Địa chỉ liên hệ</span>
              <span className="font-semibold text-sm">
                {profile?.address ?? "-"}
              </span>
            </div>
            <div className="cursor-pointer">
              <PenLine className="size-4 text-primary-base hover:text-primary-hover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
