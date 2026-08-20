import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  type ColDef,
  type ColGroupDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

ModuleRegistry.registerModules([
  CellStyleModule,
  ClientSideRowModelModule,
  ...(import.meta.env.MODE !== "production" ? [ValidationModule] : []),
]);

export default function Portfolio() {
  const { t } = useTranslation();

  const ActionComponent = () => {
    return (
      <div className="flex flex-row gap-2 items-center justify-center w-full h-full">
        <button
          onClick={() => window.alert("clicked")}
          className="hover:text-red-hover text-red-base underline"
        >
          {t("button.sell")}
        </button>
      </div>
    );
  };

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
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
        headerName: t("table.total-vol"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.tradeable-qty"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.avg-price"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.mkt-price"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.market-value"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
      },
      {
        headerName: t("table.profit-loss"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
      },
      {
        headerName: t("table.profit-loss") + " (%)",
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.dm"),
        field: "symbol",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 50,
      },
      {
        headerName: t("table.sell"),
        field: "action",
        flex: 0.7,
        cellClass: "text-center!",
        headerClass: "header-center",
        cellRenderer: ActionComponent,
        minWidth: 70,
      },
    ],
    [t],
  );

  return (
    <div className="ag-theme-custom table-history h-full w-full">
      <AgGridReact
        rowData={[]}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: false,
          resizable: false,
          cellClass: "text-xs!",
          wrapHeaderText: true,
          autoHeaderHeight: true,
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
