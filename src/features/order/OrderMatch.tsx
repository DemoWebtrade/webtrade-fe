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

export default function OrderMatch() {
  const { t } = useTranslation();

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        headerName: t("table.time"),
        field: "symbol",
        flex: 1.8,
        cellClass: "pl-0.5! md:pl-1!",
        headerClass: "pl-0.5! md:pl-1!",
        minWidth: 50,
      },
      {
        headerName: t("table.vol"),
        field: "type",
        flex: 1.5,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("table.price"),
        field: "quantity",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("+/- (%)"),
        field: "price",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("+/-"),
        field: "priceboard",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: t("table.b-s"),
        field: "status",
        flex: 0.5,
        cellClass: "text-center!",
        headerClass: "header-center",
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
