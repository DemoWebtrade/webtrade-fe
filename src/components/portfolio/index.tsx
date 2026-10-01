import { usePortfolio } from "@/hooks/usePortfolio";
import { useAppSelector } from "@/store/hook";
import { selectProfile } from "@/store/modules/auth/selector";
import { priceFormatter, volFormatter } from "@/utils";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  ModuleRegistry,
  ValidationModule,
  type ColDef,
  type ColGroupDef,
  type ICellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

ModuleRegistry.registerModules([
  CellStyleModule,
  InfiniteRowModelModule,
  ClientSideRowModelModule,
  ...(import.meta.env.MODE !== "production" ? [ValidationModule] : []),
]);

export default function Portfolio() {
  const { t } = useTranslation();

  const profile = useAppSelector(selectProfile);

  const { datasource, isLoading } = usePortfolio({ userId: profile?.id });

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
        field: "quantity",
        flex: 1.2,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 90,
        valueFormatter: volFormatter,
      },
      {
        headerName: t("table.avg-price"),
        field: "avgCost",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 80,
        valueFormatter: priceFormatter,
      },
      {
        headerName: t("table.mkt-price"),
        field: "marketPrice",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 80,
        valueFormatter: priceFormatter,
      },
      {
        headerName: t("table.market-value"),
        field: "marketValue",
        flex: 1.5,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 120,
        valueFormatter: volFormatter,
      },
      {
        headerName: t("table.profit-loss"),
        field: "unrealizedPnL",
        flex: 1,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
        cellRenderer: (p: ICellRendererParams) =>
          p.data ? (
            <span
              className={
                p.data.unrealizedPnL >= 0 ? "text-green-base" : "text-red-base"
              }
            >
              {p.data.unrealizedPnL}
            </span>
          ) : null,
      },
      {
        headerName: t("table.profit-loss") + " (%)",
        field: "unrealizedPnLPercent",
        flex: 0.8,
        cellClass: "ag-right-aligned-cell",
        headerClass: "ag-right-aligned-header",
        minWidth: 70,
        cellRenderer: (p: ICellRendererParams) =>
          p.data ? (
            <span
              className={
                p.data.unrealizedPnL >= 0 ? "text-green-base" : "text-red-base"
              }
            >
              {p.data.unrealizedPnLPercent + "%"}
            </span>
          ) : null,
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
        rowModelType="infinite"
        datasource={datasource}
        cacheBlockSize={10}
        maxBlocksInCache={10}
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
        loading={isLoading}
      />
    </div>
  );
}
