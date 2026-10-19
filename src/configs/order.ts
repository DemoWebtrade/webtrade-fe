import type { OrderType } from "@/store/modules/order/types";

export const MARKET_TYPE: Record<string, readonly string[]> = {
  HOSE: ["MTL", "ATO", "ATC"],
  HNX: ["MTL", "MOK", "MAK", "ATC", "PLO"],
  UPCOM: [],
};

export const PRICE_TYPE = ["MTL", "MOK", "MAK", "ATC", "PLO", "ATO"];

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  LO: "LO - Lệnh giới hạn",
  MP: "MP - Lệnh thị trường",
  ATO: "ATO - Khớp lệnh mở cửa",
  ATC: "ATC - Khớp lệnh đóng cửa",
  MTL: "MTL - Thị trường giới hạn",
  MOK: "MOK - Khớp toàn bộ hoặc hủy",
  MAK: "MAK - Khớp và hủy phần còn lại",
  PLO: "PLO - Lệnh sau giờ",
};

export const PRICE_MULTIPLIER = 1000;
