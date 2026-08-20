import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectOpenFilter } from "@/store/modules/order/selector";
import { setOpenFilter } from "@/store/modules/order/slice";
import { useEffect } from "react";
import OrdersHistory from "./OrdersHistorySmart";
import OrdersSearchForm from "./OrdersSearch";

export default function Orders() {
  const dispatch = useAppDispatch();

  const openFilter = useAppSelector(selectOpenFilter);

  useEffect(() => {
    return () => {
      dispatch(setOpenFilter(false));
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {openFilter && <OrdersSearchForm />}
      <OrdersHistory />
    </div>
  );
}
