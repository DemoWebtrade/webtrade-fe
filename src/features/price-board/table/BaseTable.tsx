import { formatVolPrice, numberFormat } from "@/utils";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  type CellClassParams,
  type CellStyle,
  type ColDef,
  type ColGroupDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { rowData } from "./data";

ModuleRegistry.registerModules([ClientSideRowModelModule, CellStyleModule]);

interface RowData {
  ceil: number;
  ref: number;
  floor: number;
  [key: string]: number;
}

const priceFormatter = (params: any) =>
  params.value ? numberFormat(params.value / 1000, 2, "-") : "";
const volFormatter = (params: any) =>
  params.value ? formatVolPrice(params.value) : "";
const changePctFormatter = (params: any) => {
  if (params.value == null) return "";

  const value = Number(params.value);
  const formatted = Math.abs(value).toFixed(2);
  return `${formatted}%`;
};

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
    case "stock":
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
export default function BaseTable() {
  const { t } = useTranslation();

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        field: "stock",
        headerName: t("symbol"),
        width: 60, // giữ width cố định vì pinned
        minWidth: 55,
        maxWidth: 65,
        pinned: "left",
        suppressSizeToFit: true,
        cellStyle: coloredCellStyle,
      },

      // Giá tham chiếu
      {
        field: "ceil",
        headerName: t("ceil"),
        minWidth: 46,
        flex: 0.7,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "ref",
        headerName: t("ref"),
        minWidth: 46,
        flex: 0.7,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "floor",
        headerName: t("floor"),
        minWidth: 46,
        flex: 0.7,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },

      // Bên mua
      {
        headerName: t("bid"),
        marryChildren: true,
        children: [
          {
            field: "buyPrice3",
            headerName: `${t("p")}3`,
            minWidth: 45,
            flex: 1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol3",
            headerName: `${t("vol")}3`,
            minWidth: 45,
            flex: 1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "buyPrice2",
            headerName: `${t("p")}2`,
            minWidth: 45,
            flex: 1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol2",
            headerName: `${t("vol")}2`,
            minWidth: 45,
            flex: 1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "buyPrice1",
            headerName: `${t("p")}1`,
            minWidth: 45,
            flex: 1.1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "buyVol1",
            headerName: `${t("vol")}1`,
            minWidth: 45,
            flex: 1.1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
        ],
      },

      // Khớp lệnh
      {
        headerName: `${t("matched")}`,
        marryChildren: true,
        children: [
          {
            field: "matchPrice",
            headerName: `${t("p")}`,
            minWidth: 50,
            flex: 1.3,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "matchVol",
            headerName: t("vol"),
            minWidth: 50,
            flex: 1.2,
            cellStyle: coloredCellStyle,
            valueFormatter: volFormatter,
          },
          {
            field: "change",
            headerName: "+/-",
            minWidth: 50,
            flex: 1,
            cellStyle: coloredCellStyle,
            valueFormatter: volFormatter,
          },
          {
            field: "changePct",
            headerName: "%",
            minWidth: 50,
            flex: 1.1,
            cellStyle: coloredCellStyle,
            valueFormatter: changePctFormatter,
          },
        ],
      },

      // Bên bán
      {
        headerName: `${t("asked")}`,
        marryChildren: true,
        children: [
          {
            field: "sellPrice1",
            headerName: `${t("p")}1`,
            minWidth: 45,
            flex: 1.1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol1",
            headerName: `${t("vol")}1`,
            minWidth: 45,
            flex: 1.1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "sellPrice2",
            headerName: `${t("p")}2`,
            minWidth: 45,
            flex: 1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol2",
            headerName: `${t("vol")}2`,
            minWidth: 45,
            flex: 1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
          {
            field: "sellPrice3",
            headerName: `${t("p")}3`,
            minWidth: 45,
            flex: 1,
            cellStyle: coloredCellStyle,
            valueFormatter: priceFormatter,
          },
          {
            field: "sellVol3",
            headerName: `${t("vol")}3`,
            minWidth: 45,
            flex: 1,
            valueFormatter: volFormatter,
            cellStyle: coloredCellStyle,
          },
        ],
      },

      // Thông tin khác
      {
        field: "totalVolume",
        headerName: `${t("total-vol")}`,
        minWidth: 57,
        flex: 1.2,
        valueFormatter: volFormatter,
        cellStyle: coloredCellStyle,
      },
      {
        field: "high",
        headerName: `${t("high")}`,
        minWidth: 46,
        flex: 0.7,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },
      {
        field: "low",
        headerName: `${t("low")}`,
        minWidth: 46,
        flex: 0.7,
        cellStyle: coloredCellStyle,
        valueFormatter: priceFormatter,
      },

      // Nhà đầu tư nước ngoài
      {
        headerName: `${t("foreign")}`,
        headerClass: "text-xs text-center",
        marryChildren: true,
        children: [
          {
            field: "nnBuy",
            headerName: `${t("fbuy")}`,
            minWidth: 55,
            flex: 1.1,
            valueFormatter: volFormatter,
          },
          {
            field: "nnSell",
            headerName: `${t("fsell")}`,
            minWidth: 55,
            flex: 1.1,
            valueFormatter: volFormatter,
          },
          {
            field: "nnRoom",
            headerName: `${t("room")}`,
            minWidth: 55,
            flex: 1.3,
            headerClass: "text-xs",
            cellClass: "text-xs text-right",
            valueFormatter: volFormatter,
          },
        ],
      },
    ],
    [t],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: false,
      headerClass: "text-xs! font-normal! border-r! border-border!",
    }),
    [],
  );

  const loading = false;

  return (
    <div className="w-full h-full ag-theme-quartz-custom">
      <AgGridReact
        getRowId={(p) => p.data.stock}
        rowData={rowData}
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
      />
    </div>
  );
}
