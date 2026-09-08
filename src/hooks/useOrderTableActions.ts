import { useAppDispatch } from "@/store/hook";
import { orderCancelThunk, orderUpdateThunk } from "@/store/modules/order/api";
import { useCallback } from "react";
import { toast } from "sonner";

export function useOrderTableActions() {
  const dispatch = useAppDispatch();

  const cancelOrder = useCallback(
    async (orderId: string): Promise<boolean> => {
      try {
        await dispatch(orderCancelThunk(orderId)).unwrap();
        toast.success("Đã hủy lệnh");
        return true;
      } catch (err) {
        toast.error(typeof err === "string" ? err : "Hủy lệnh thất bại");
        return false;
      }
    },
    [dispatch],
  );

  const updateOrder = useCallback(
    async (id: string, price: number, quantity: number): Promise<boolean> => {
      try {
        await dispatch(orderUpdateThunk({ id, price, quantity })).unwrap();
        toast.success("Cập nhật lệnh thành công");
        return true;
      } catch (err) {
        toast.error(typeof err === "string" ? err : "Cập nhật lệnh thất bại");
        return false;
      }
    },
    [dispatch],
  );

  return { cancelOrder, updateOrder };
}
