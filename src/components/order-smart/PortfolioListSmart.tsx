import {
  CellStyleModule,
  ModuleRegistry,
  ValidationModule,
  type ColDef,
  type ColGroupDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import TwoLineHeader from "../features/table/TwoLineHeader";

ModuleRegistry.registerModules([
  CellStyleModule,
  ...(import.meta.env.MODE !== "production" ? [ValidationModule] : []),
]);

export default function PortfolioListSmart() {
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
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.tradeable-qty"),
          line2: t("table.total-vol"),
        },
        field: "type",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.mkt-price"),
          line2: t("table.avg-price"),
        },
        field: "quantity",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
      },
      {
        headerName: t("table.market-value"),
        field: "price",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.profit-loss"),
          line2: t("table.profit-loss") + " (%)",
        },
        field: "status",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
      },
      {
        headerName: t("table.sell"),
        field: "action",
        flex: 0.7,
        cellClass: "text-center!",
        headerClass: "header-center",
        cellRenderer: ActionComponent,
      },
    ],
    [t],
  );

  return (
    <div className="ag-theme-custom h-full w-full">
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
