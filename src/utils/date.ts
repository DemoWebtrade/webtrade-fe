import i18n from "@/lib/i18n";
import type dayjs from "dayjs";

const officialHolidays2026 = [
  "2026-01-01", // Tết Dương lịch
  "2026-02-17",
  "2026-02-18",
  "2026-02-19",
  "2026-02-20",
  "2026-02-21",
  "2026-02-22",
  "2026-02-23", // Tết Nguyên Đán
  "2026-04-26", // Giỗ Tổ Hùng Vương
  "2026-04-30", // Ngày Giải phóng miền Nam
  "2026-05-01", // Quốc tế Lao động
  "2026-09-02", // Quốc khánh
];

export const isNonTradingDay = (date: dayjs.Dayjs): boolean => {
  const dateStr = date.format("YYYY-MM-DD");

  if (officialHolidays2026.includes(dateStr)) return true;

  const dayOfWeek = date.day(); // 0 = Chủ nhật, 6 = Thứ 7
  if (dayOfWeek === 0 || dayOfWeek === 6) return true;

  return false;
};

// Hàm lấy nội dung tooltip cho ngày
export const getTooltipContent = (date: dayjs.Dayjs): string => {
  const dateStr = date.format("YYYY-MM-DD");

  const key = `trading-tooltip.${dateStr}`;
  const defaultKey = `trading-tooltip.default`;

  if (i18n.exists(key)) {
    return i18n.t(key);
  }

  return i18n.t(defaultKey);
};
