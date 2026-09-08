import { useAppDispatch } from "@/store/hook";
import { orderPlaceThunk } from "@/store/modules/order/api";
import type {
  PlaceOrderInput,
  PlaceOrderResponse,
} from "@/store/modules/order/types";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

interface AbortablePromise<T = unknown> {
  abort: () => void;
  unwrap: () => Promise<T>;
}

export function usePlaceOrder() {
  const dispatch = useAppDispatch();
  const pendingRef = useRef<AbortablePromise | null>(null);

  const place = useCallback(
    (input: PlaceOrderInput) => {
      const promise = dispatch(
        orderPlaceThunk(input),
      ) as unknown as AbortablePromise<PlaceOrderResponse>;
      pendingRef.current = promise;

      promise
        .unwrap()
        .then(() => toast.success("Đặt lệnh thành công"))
        .catch((err) =>
          toast.error(typeof err === "string" ? err : "Đặt lệnh thất bại"),
        );
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      pendingRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      pendingRef.current?.abort();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return { place };
}
