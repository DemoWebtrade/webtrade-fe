import TwoLineHeader from "@/components/features/table/TwoLineHeader";
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

export default function OrderStatement() {
  const { t } = useTranslation();

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        headerName: t("table.transaction-date"),
        field: "transactionDate",
        flex: 0.8,
        cellClass: "pl-1!",
        headerClass: "pl-1!",
        minWidth: 100,
      },
      {
        headerName: t("table.command"),
        field: "command",
        flex: 0.8,
        minWidth: 80,
      },
      {
        headerName: t("table.symbol"),
        field: "symbol",
        flex: 0.8,
        minWidth: 80,
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.order-price"),
          line2: t("table.order-quantity"),
        },
        field: "orderPrice",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
        minWidth: 120,
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.match-price"),
          line2: t("table.match-volume"),
        },
        field: "matchPrice",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
        minWidth: 120,
      },
      {
        headerName: t("table.match-value"),
        field: "matchValue",
        flex: 1.5,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 150,
      },
      {
        headerComponent: TwoLineHeader,
        headerComponentParams: {
          line1: t("table.transaction-fee"),
          line2: t("table.personal-tax"),
        },
        field: "transactionFee",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header text-right!",
        minWidth: 120,
      },
      {
        headerName: t("table.transaction-value"),
        field: "transactionValue",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 120,
      },
      {
        headerName: t("table.command-number"),
        field: "commandNumber",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 100,
      },
      {
        headerName: t("table.trading-channel"),
        field: "tradingChannel",
        flex: 1.2,
        minWidth: 120,
        cellClass: "pl-2!",
        headerClass: "pl-2!",
      },
      {
        headerName: t("table.status"),
        field: "status",
        flex: 1,
        minWidth: 100,
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
