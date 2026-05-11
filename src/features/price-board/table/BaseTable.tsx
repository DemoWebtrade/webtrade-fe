import { useAgGridAutoScroll } from "@/hooks/useAgGridAutoScroll";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  selectExport,
  selectScroll,
} from "@/store/modules/priceboard/selector";
import { setExport } from "@/store/modules/priceboard/slice";
import type { StockData } from "@/types";
import { changePctFormatter, priceFormatter, volFormatter } from "@/utils";
import {
  CellStyleModule,
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  CsvExportModule,
  ModuleRegistry,
  PinnedRowModule,
  RowApiModule,
  RowDragModule,
  ScrollApiModule,
  themeQuartz,
  TooltipModule,
  ValidationModule,
  type CellClassParams,
  type CellDoubleClickedEvent,
  type CellStyle,
  type ColDef,
  type ColGroupDef,
  type Theme,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PinRow from "./PinRow";
import SymbolRow from "./SymbolRow";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CellStyleModule,
  RowDragModule,
  PinnedRowModule,
  ValidationModule,
  ColumnAutoSizeModule,
  RowApiModule,
  ScrollApiModule,
  ClientSideRowModelApiModule,
  TooltipModule,
  CsvExportModule,
  ColumnApiModule,
]);

interface RowData {
  ceil: number;
  ref: number;
  floor: number;
  [key: string]: number;
}

const coloredCellStyle = (
  params: CellClassParams<RowData, number>,
): CellStyle => {
  if (params.value == null || params.data == null) return {};

  // Xác định giá cần so sánh (tùy theo field)
  let comparePrice: number | undefined;

  switch (params.colDef?.field) {
    // Bên mua - khối lượng theo giá tương ứng
    case "buyVol3":
    case "buyPrice3":
      comparePrice = params.data.buyPrice3;
      break;
    case "buyVol2":
    case "buyPrice2":
      comparePrice = params.data.buyPrice2;
      break;
    case "buyVol1":
    case "buyPrice1":
      comparePrice = params.data.buyPrice1;
      break;

    // Bên bán - khối lượng theo giá tương ứng
    case "sellVol1":
    case "sellPrice1":
      comparePrice = params.data.sellPrice1;
      break;
    case "sellVol2":
    case "sellPrice2":
      comparePrice = params.data.sellPrice2;
      break;
    case "sellVol3":
    case "sellPrice3":
      comparePrice = params.data.sellPrice3;
      break;

    // Khớp lệnh - volume theo matchPrice
    case "matchVol":
    case "matchPrice":
    case "changePct":
    case "change":
    case "symbol":
      comparePrice = params.data.matchPrice;
      break;

    // Các cột giá và high/low - dùng chính value
    default:
      comparePrice = params.value;
      break;
  }

  if (comparePrice == null) return {};

  const ref = params.data.ref;
  const ceil = params.data.ceil;
  const floor = params.data.floor;

  if (comparePrice === ceil) {
    return { color: "#ff25ff" };
  }
  if (comparePrice === floor) {
    return { color: "#00b2ff" };
  }
  if (comparePrice > ref) {
    return { color: "#00ff00" };
  }
  if (comparePrice < ref) {
    return { color: "#ff3737" };
  }
  if (comparePrice === ref) {
    return { color: "#ffd900" };
  }

  return {
    color: "#ffffff",
  };
};

export default function BaseTable({ data }: { data: StockData[] }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const scroll = useAppSelector(selectScroll);
  const exportFile = useAppSelector(selectExport);

  const gridRef = useRef<AgGridReact>(null);
  const prevDataRef = useRef<Map<string, StockData>>(new Map());

  const [initialData] = useState(() => data);

  useEffect(() => {
    if (!gridRef.current?.api) return;

    const updates: StockData[] = [];

    for (const row of data) {
      const prev = prevDataRef.current.get(row.symbol);
      if (!prev) {
        // Mã mới chưa có → add
        gridRef.current.api.applyTransactionAsync({ add: [row] });
      } else {
        updates.push(row);
      }
      prevDataRef.current.set(row.symbol, row);
    }

    if (updates.length > 0) {
      gridRef.current.api.applyTransactionAsync({ update: updates });
    }
  }, [data]);

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        field: "pinRow",
        colId: "pinRow",
        headerName: " ",
        width: 28,
        pinned: "left",
        lockPinned: true,
        lockPosition: "left",
        cellRenderer: PinRow,
      },
      {
        field: "symbol",
        headerName: t("symbol"),
        width: 60, // giữ width cố định vì pinned
        minWidth: 55,
        maxWidth: 55,
        pinned: "left",
        lockPinned: true,
        lockPosition: "left",
        enableCellChangeFlash: true,
        cellRenderer: SymbolRow,
        cellStyle: coloredCellStyle,
      },

      // Giá tham chiếu
      {
        field: "ceil",
        headerName: t("ceil"),
        minWidth: 46,
        flex: 1,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "ref",
        headerName: t("ref"),
        minWidth: 46,
        flex: 1,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "floor",
        headerName: t("floor"),
        minWidth: 46,
        flex: 1,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },

      // Bên mua
      {
        headerName: t("bid"),

        children: [
          {
            field: "buyPrice3",
            headerName: `${t("p")}3`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol3",
            headerName: `${t("vol")}3`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "buyPrice2",
            headerName: `${t("p")}2`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol2",
            headerName: `${t("vol")}2`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "buyPrice1",
            headerName: `${t("p")}1`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol1",
            headerName: `${t("vol")}1`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
        ],
      },

      // Khớp lệnh
      {
        headerName: `${t("matched")}`,
        children: [
          {
            field: "matchPrice",
            headerName: `${t("price")}`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,

            valueFormatter: priceFormatter,
          },
          {
            field: "matchVol",
            headerName: t("vol"),
            minWidth: 65,
            flex: 1.2,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: volFormatter,
          },
          {
            field: "change",
            headerName: "+/-",
            minWidth: 40,
            flex: 0.8,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "changePct",
            headerName: "%",
            minWidth: 40,
            flex: 0.8,
            cellStyle: coloredCellStyle,
            valueFormatter: changePctFormatter,
          },
        ],
      },

      // Bên bán
      {
        headerName: `${t("asked")}`,
        children: [
          {
            field: "sellPrice1",
            headerName: `${t("p")}1`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol1",
            headerName: `${t("vol")}1`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "sellPrice2",
            headerName: `${t("p")}2`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol2",
            headerName: `${t("vol")}2`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "sellPrice3",
            headerName: `${t("p")}3`,
            minWidth: 46,
            flex: 1,
            enableCellChangeFlash: true,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol3",
            headerName: `${t("vol")}3`,
            minWidth: 55,
            flex: 1,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
        ],
      },

      // Thông tin khác

      {
        field: "high",
        headerName: `${t("high")}`,
        minWidth: 46,
        flex: 1,
        enableCellChangeFlash: true,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "low",
        headerName: `${t("low")}`,
        minWidth: 46,
        flex: 1.1,
        enableCellChangeFlash: true,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "totalVolume",
        headerName: `${t("total-vol")}`,
        minWidth: 70,
        flex: 1.5,
        enableCellChangeFlash: true,
        valueFormatter: volFormatter,
      },
      // Nhà đầu tư nước ngoài
      {
        headerName: `${t("foreign")}`,
        headerClass: "text-xs text-center",
        children: [
          {
            field: "nnBuy",
            headerName: `${t("fbuy")}`,
            minWidth: 70,
            flex: 1.5,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
          },
          {
            field: "nnSell",
            headerName: `${t("fsell")}`,
            minWidth: 70,
            flex: 1.5,
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
          },
          {
            field: "nnRoom",
            headerName: `${t("room")}`,
            minWidth: 70,
            flex: 1.5,
            headerClass: "text-xs",
            cellClass: "text-xs text-right",
            enableCellChangeFlash: true,
            valueFormatter: volFormatter,
          },
        ],
      },
    ],
    [t],
  );

  const { resumeAutoScroll, stopAutoScroll } = useAgGridAutoScroll({
    durationPerCycle: data?.length * 1000,
    enabled: true,
  });

  useEffect(() => {
    if (!gridRef.current) return;

    if (scroll && data?.length) {
      resumeAutoScroll();
    } else {
      stopAutoScroll();
    }
  }, [scroll, resumeAutoScroll, stopAutoScroll, gridRef]);

  useEffect(() => {
    if (!gridRef.current || !exportFile || !data?.length) return;

    gridRef.current!.api.exportDataAsCsv({
      fileName: "GROUP_VN30.csv",
      skipColumnGroupHeaders: true,

      columnKeys: gridRef
        .current!.api.getAllGridColumns()
        .filter((col) => {
          const colDef = col.getColDef();
          return colDef.field !== "pinRow" && colDef.colId !== "pinRow";
        })
        .map((col) => col.getColId()),

      processCellCallback: (params) => {
        const value = params.value;

        if (value == null || value === "") return "";

        const strValue = String(value).trim();

        if (/^-?\d+(\.\d+)?$/.test(strValue)) {
          return "\u200C" + strValue;
        }

        return strValue;
      },
    });

    dispatch(setExport(false));
  }, [exportFile, gridRef, dispatch]);

  const onCellDoubleClicked = useCallback((params: CellDoubleClickedEvent) => {
    if (params.column.getColId() !== "pinRow") return;

    const rowNode = params.node;
    if (!rowNode?.data) return;

    const data = rowNode.data;
    const api = params.api;

    // Lấy pinned hiện tại
    const pinnedRows = [];
    const count = api.getPinnedTopRowCount();

    for (let i = 0; i < count; i++) {
      const node = api.getPinnedTopRow(i);
      if (node?.data) pinnedRows.push(node.data);
    }

    const isPinned = pinnedRows.some((r) => r.symbol === data.symbol);

    if (isPinned) {
      // Unpin
      api.setGridOption(
        "pinnedTopRowData",
        pinnedRows.filter((r) => r.symbol !== data.symbol),
      );

      api.applyTransaction({
        add: [data],
      });
    } else {
      // Pin
      api.applyTransaction({ remove: [data] });

      api.setGridOption("pinnedTopRowData", [...pinnedRows, data]);
    }
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: false,
      enableCellChangeFlash: true,
      cellFlashDuration: 500,
      cellFadeDuration: 300,
      headerClass: "text-xs! font-normal! border-r! border-border!",
      headerTooltip: `${t("change-col")}`,
    }),
    [t],
  );

  const theme = useMemo<Theme | "legacy">(() => {
    return themeQuartz.withParams({
      pinnedRowBorder: {
        width: 2,
      },
    });
  }, []);

  const loading = false;

  console.log(initialData);

  return (
    <div className="w-full h-full ag-theme-quartz-custom flex flex-col min-h-50">
      <AgGridReact
        ref={gridRef}
        getRowId={(p) => p.data.symbol}
        rowData={initialData}
        loading={loading}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={28}
        headerHeight={28}
        groupHeaderHeight={28}
        suppressCellFocus
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
        onGridSizeChanged={(params) => {
          params.api.sizeColumnsToFit();
        }}
        overlayNoRowsTemplate={`
          <div class="md:text-sm text-xs py-4">
            ${t("no-data")}
          </div>`}
        suppressMoveWhenColumnDragging={true}
        suppressDragLeaveHidesColumns={true}
        suppressMoveWhenRowDragging={true}
        rowDragManaged={true}
        onCellDoubleClicked={onCellDoubleClicked}
        theme={theme}
        tooltipShowDelay={0}
        tooltipHideDelay={2000}
        suppressScrollOnNewData={true}
      />
      <div className="text-[10px] flex flex-row gap-1 items-center justify-center text-content-primary h-4 rounded-b-lg border-x border-b border-border">
        <span>{t("price-table", { price: "1,000" })}</span>
        <span>{t("volume-table", { volume: "1" })}</span>
        <span>{t("value-table", { value: "1,000,000" })} </span>
        <span className="text-content-disable hidden md:block">
          {t("copy-right")}
        </span>
      </div>
    </div>
  );
}
