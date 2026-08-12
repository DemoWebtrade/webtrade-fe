import {
  CellStyleModule,
  ModuleRegistry,
  ValidationModule,
  type ColDef,
  type ColGroupDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

ModuleRegistry.registerModules([
  CellStyleModule,
  ...(import.meta.env.MODE !== "production" ? [ValidationModule] : []),
]);

export default function OrderHistory() {
  const { t } = useTranslation();

  const rowData = [
    {
      symbol: "VN30",
      type: "Mua",
      quantity: 100,
      price: 10,
      status: "Hóa đơn",
      action: "Sửa",
    },
    {
      symbol: "VN30",
      type: "Mua",
      quantity: 100,
      price: 10,
      status: "Hóa đơn",
      action: "Sửa",
    },
    {
      symbol: "VN30",
      type: "Mua",
      quantity: 100,
      price: 10,
      status: "Hóa đơn",
      action: "Sửa",
    },
  ];

  const CustomButtonComponent = () => {
    return (
      <div className="flex flex-row gap-2 items-center justify-center w-full h-full">
        <button
          onClick={() => window.alert("clicked")}
          className="hover:text-red-hover"
        >
          <Pencil className="size-3.25" />
        </button>
        <button
          onClick={() => window.alert("clicked")}
          className="hover:text-red-hover"
        >
          <Trash2 className="size-3.25" />
        </button>
      </div>
    );
  };

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        headerName: t("Mã CK"),
        field: "symbol",
        flex: 1,
        cellClass: "pl-1!",
        headerClass: "pl-1!",
      },
      {
        headerName: t("Mua/Bán"),
        field: "type",
        flex: 0.8,
        cellClass: "text-left!",
        headerClass: "text-left!",
      },
      {
        headerName: t("KL đặt"),
        field: "quantity",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("Giá đặt"),
        field: "price",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("Trạng thái"),
        field: "status",
        flex: 1.2,
        cellClass: "text-center!",
        headerClass: "header-center",
      },
      {
        headerName: t("Sửa/Hủy"),
        field: "action",
        flex: 1,
        cellClass: "text-center!",
        headerClass: "header-center",
        cellRenderer: CustomButtonComponent,
      },
    ],
    [t],
  );

  return (
    <div className="ag-theme-custom h-full w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: false,
          resizable: false,
          cellClass: "text-xs! ",
        }}
        overlayNoRowsTemplate={`
          <div class="md:text-sm text-xs py-4">
            ${t("no-data")}
          </div>`}
        suppressMovableColumns={true}
        suppressCellFocus={true}
        rowHeight={28}
        headerHeight={28}
      />
    </div>
  );
}
