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

export default function HistoryTranferMoney() {
  const { t } = useTranslation();

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        headerName: t("table.transaction-date"),
        field: "symbol",
        flex: 0.8,
        cellClass: "pl-1!",
        headerClass: "pl-1!",
        minWidth: 100,
      },
      {
        headerName: t("table.transaction-method"),
        field: "type",
        flex: 1.2,
        minWidth: 120,
      },
      {
        headerName: t("table.transfer-account-number"),
        field: "quantity",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 120,
      },
      {
        headerName: t("table.beneficiary-account-number"),
        field: "price",
        flex: 1,
        cellClass: "text-center!",
        headerClass: "header-center!",
        minWidth: 140,
      },
      {
        headerName: t("table.beneficiary-bank"),
        field: "price",
        flex: 1,
        cellClass: "text-center!",
        headerClass: "header-center!",
        minWidth: 100,
      },
      {
        headerName: t("table.beneficiary-account-name"),
        field: "price",
        flex: 1,
        minWidth: 150,
      },
      {
        headerName: t("table.transfer-amount"),
        field: "price",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 120,
      },
      {
        headerName: t("table.content"),
        field: "price",
        flex: 2,
        minWidth: 250,
        cellClass: "pl-2!",
        headerClass: "pl-2!",
      },
      {
        headerName: t("table.status"),
        field: "price",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
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
