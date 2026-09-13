import { useOrderHistory } from "@/hooks/useOrderHistory";
import { useOrderTableActions } from "@/hooks/useOrderTableActions";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectProfile } from "@/store/modules/auth/selector";

import {
  selectLoadingCancelOrder,
  selectLoadingUpdateOrder,
  selectRefreshOrders,
} from "@/store/modules/order/selector";
import { consumeRefreshOrders } from "@/store/modules/order/slice";
import type {
  OrderSide,
  OrderStatus,
  OrderType,
} from "@/store/modules/order/types";
import { priceFormatter, volFormatter } from "@/utils";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  ModuleRegistry,
  RowApiModule,
  ValidationModule,
  type ColDef,
  type ColGroupDef,
  type GridApi,
  type ICellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmCancelOrderModal from "./ConfirmCancelOrderModal";
import EditOrderModal from "./EditOrderModal";

ModuleRegistry.registerModules([
  CellStyleModule,
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  RowApiModule,
  ...(import.meta.env.MODE !== "production" ? [ValidationModule] : []),
]);

export interface OrderRow {
  _id: string;
  symbol: string;
  side: OrderSide;
  orderType: OrderType;
  price: number;
  quantity: number;
  matchedQuantity: number;
  matchedPrice?: number;
  status: OrderStatus;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

const SIDE_LABEL: Record<OrderSide, { text: string; className: string }> = {
  buy: { text: "Mua", className: "text-green-base" },
  sell: { text: "Bán", className: "text-red-base" },
};

const STATUS_LABEL: Record<OrderStatus, { text: string; className: string }> = {
  pending: { text: "Chờ khớp", className: "text-yellow-base font-bold" },
  partial: { text: "Khớp một phần", className: "text-blue-base font-bold" },
  matched: { text: "Đã khớp", className: "text-green-base font-bold" },
  cancelled: { text: "Đã hủy", className: "text-red-base font-bold" },
  rejected: { text: "Từ chối", className: "text-red-base font-bold" },
};

const EDITABLE_STATUSES: OrderStatus[] = ["pending"];
const CANCELLABLE_STATUSES: OrderStatus[] = ["pending", "partial"];

function StatusCellRenderer({ data }: ICellRendererParams<OrderRow>) {
  if (!data) return null;
  const { text, className } = STATUS_LABEL[data.status];
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {text}
    </span>
  );
}

function SideCellRenderer({ data }: ICellRendererParams<OrderRow>) {
  if (!data) return null;
  const { text, className } = SIDE_LABEL[data.side];
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {text}
    </span>
  );
}

function ActionCellRenderer({
  data,
  context,
}: ICellRendererParams<OrderRow> & {
  context: {
    onEdit: (order: OrderRow) => void;
    onCancel: (order: OrderRow) => void;
  };
}) {
  if (!data) return null;

  const canEdit = EDITABLE_STATUSES.includes(data.status);
  const canCancel = CANCELLABLE_STATUSES.includes(data.status);

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full h-full">
      <button
        type="button"
        aria-label={`Sửa lệnh ${data.symbol}`}
        onClick={() => canEdit && context.onEdit(data)}
        disabled={!canEdit}
        className="hover:text-content-primary text-content-tertiary disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Pencil className="size-3.25" />
      </button>
      <button
        type="button"
        aria-label={`Hủy lệnh ${data.symbol}`}
        onClick={() => canCancel && context.onCancel(data)}
        disabled={!canCancel}
        className="hover:text-red-base text-content-tertiary disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Trash2 className="size-3.25" />
      </button>
    </div>
  );
}

export default function OrdersHistorySmart() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { cancelOrder, updateOrder } = useOrderTableActions();

  const profile = useAppSelector(selectProfile);
  const { datasource, isLoading } = useOrderHistory({
    userId: profile?.id,
    side: "all",
  });
  const cancelLoading = useAppSelector(selectLoadingCancelOrder);
  const updateLoading = useAppSelector(selectLoadingUpdateOrder);
  const refreshOrders = useAppSelector(selectRefreshOrders);

  const gridApiRef = useRef<GridApi | null>(null);

  const [pendingCancel, setPendingCancel] = useState<OrderRow | null>(null);
  const [editingOrder, setEditingOrder] = useState<OrderRow | null>(null);

  useEffect(() => {
    if (refreshOrders > 0) {
      gridApiRef.current?.refreshInfiniteCache();
      dispatch(consumeRefreshOrders());
    }
  }, [refreshOrders, dispatch]);

  const handleConfirmCancel = async () => {
    if (!pendingCancel) return;
    const success = await cancelOrder(pendingCancel._id);

    if (success) {
      const node = gridApiRef.current?.getRowNode(pendingCancel._id);
      if (node?.data) {
        node.setData({ ...node.data, status: "cancelled" });
      }
    }
    setPendingCancel(null);
  };

  const handleSubmitEdit = async (formData: {
    price: number;
    quantity: number;
  }) => {
    if (!editingOrder) return;
    const success = await updateOrder(
      editingOrder._id,
      formData.price,
      formData.quantity,
    );

    if (success) {
      const node = gridApiRef.current?.getRowNode(editingOrder._id);
      if (node?.data) {
        node.setData({
          ...node.data,
          price: formData.price,
          quantity: formData.quantity,
        });
      }
    }

    setEditingOrder(null);
  };

  const columnDefs = useMemo<(ColDef<OrderRow> | ColGroupDef<OrderRow>)[]>(
    () => [
      {
        headerName: t("table.symbol"),
        field: "symbol",
        flex: 0.8,
        cellClass: "pl-1!",
        headerClass: "pl-1!",
        minWidth: 70,
      },
      {
        headerName: t("table.buy-sell"),
        flex: 0.8,
        cellClass: "text-center!",
        headerClass: "header-center",
        minWidth: 50,
        cellRenderer: SideCellRenderer,
      },
      {
        headerName: t("table.quantity"),
        field: "quantity",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
        valueFormatter: volFormatter,
      },
      {
        headerName: t("table.price-order"),
        field: "price",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
        valueFormatter: priceFormatter,
      },
      {
        headerName: t("table.matched-qty"),
        field: "matchedQuantity",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
        valueFormatter: volFormatter,
      },
      {
        headerName: t("table.status"),
        flex: 1.2,
        cellClass: "text-center!",
        headerClass: "header-center",
        minWidth: 100,
        cellRenderer: StatusCellRenderer,
      },
      {
        headerName: t("table.edit-cancel"),
        flex: 1,
        cellClass: "text-center!",
        headerClass: "header-center",
        cellRenderer: ActionCellRenderer,
        minWidth: 70,
        sortable: false,
      },
    ],
    [t],
  );

  return (
    <div className="ag-theme-custom h-full w-full">
      <AgGridReact<OrderRow>
        key={`${profile?.id}-${"all"}`}
        rowModelType="infinite"
        datasource={datasource}
        getRowId={(params) => params.data._id}
        onGridReady={(e) => {
          gridApiRef.current = e.api;
        }}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: false,
          resizable: false,
          cellClass: "text-xs!",
        }}
        overlayNoRowsTemplate={`<div class="md:text-sm text-xs py-4">${t("no-data")}</div>`}
        suppressMovableColumns={true}
        suppressCellFocus={true}
        rowHeight={28}
        headerHeight={28}
        loading={isLoading}
        context={{
          onEdit: (order: OrderRow) => setEditingOrder(order),
          onCancel: (order: OrderRow) => setPendingCancel(order),
        }}
      />

      <ConfirmCancelOrderModal
        open={!!pendingCancel}
        order={pendingCancel}
        loading={cancelLoading}
        onConfirm={handleConfirmCancel}
        onCancel={() => setPendingCancel(null)}
      />

      <EditOrderModal
        open={!!editingOrder}
        order={editingOrder}
        loading={updateLoading}
        onClose={() => setEditingOrder(null)}
        onSubmit={handleSubmitEdit}
      />
    </div>
  );
}
