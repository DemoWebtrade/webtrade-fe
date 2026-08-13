import SelectField from "@/components/ui/inputs/SelectField";
import { FileDown } from "lucide-react";

export default function OrdersSearch() {
  return (
    <form className="px-2 py-3 grid grid-cols-4 space-x-1 place-items-center">
      <SelectField
        name="side"
        placeholder="Mua/Bán"
        options={[
          {
            label: "Mua/Bán",
            value: "ALL",
          },
          {
            label: "Mua",
            value: "Mua",
          },
          {
            label: "Bán",
            value: "Bán",
          },
        ]}
        className="text-xs! px-1! py-0.5!"
      />

      <SelectField
        name="status"
        placeholder="Tất cả"
        options={[
          {
            label: "Tất cả",
            value: "ALL",
          },
          {
            label: "Chờ khớp",
            value: "Chờ khớp",
          },
          {
            label: "Khớp",
            value: "Khớp",
          },
          {
            label: "Đã hủy",
            value: "Đã hủy",
          },
          {
            label: "Đang xử lý",
            value: "Đang xử lý",
          },
          {
            label: "Từ chối",
            value: "Từ chối",
          },
        ]}
        className="text-xs! px-1! py-0.5!"
      />

      <SelectField
        name="type"
        placeholder="Tất cả"
        options={[
          {
            label: "Tất cả",
            value: "ALL",
          },
          {
            label: "Giao dịch cơ sở",
            value: "Giao dịch cơ sở",
          },
          {
            label: "Đặt lệnh điều kiện",
            value: "Đặt lệnh điều kiện",
          },
        ]}
        className="text-xs! px-1! py-0.5!"
      />

      <button className="flex flex-row gap-1 items-center justify-center cursor-pointer">
        <FileDown className="size-4" />
        <span className="text-sm">Xuất dữ liệu</span>
      </button>
    </form>
  );
}
