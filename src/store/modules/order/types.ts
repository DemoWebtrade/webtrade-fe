export interface OrderState {
  openOrder: boolean;
  openFilter: boolean;

  refreshOrders: number;

  loading: {
    placeOrder: boolean;
    updateOrder: boolean;
    cancelOrder: boolean;
  };

  error: {
    placeOrder: string | null;
    updateOrder: string | null;
    cancelOrder: string | null;
  };
}

export type PlaceOrderInput = {
  tradingAccountId: string;
  symbol: string;
  side: "buy" | "sell";
  orderType: string;
  price: number;
  quantity: number;
  otp: string;
};

export type OrderSide = "buy" | "sell";

export type OrderMarket = "HOSE" | "HNX" | "UPCOM";

export type OrderType =
  | "LO"
  | "MP"
  | "ATO"
  | "ATC"
  | "MTL"
  | "MOK"
  | "MAK"
  | "PLO";

export type OrderStatus =
  | "pending"
  | "partial"
  | "matched"
  | "cancelled"
  | "rejected";

export interface PlaceOrderResponse {
  _id: string;
  userId: string;
  tradingAccountId: string;
  symbol: string;
  side: OrderSide;
  orderType: OrderType;
  price: number;
  quantity: number;
  matchedQuantity: number;
  matchedPrice?: number;
  status: OrderStatus;
  createdBy: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpdateOrderPayload {
  id: string;
  price?: number;
  quantity?: number;
  otp: string;
}

export interface CancleOrderPayload {
  orderId: string;
  otp: string;
}
