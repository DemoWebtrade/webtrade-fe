import {
  ClientSideRowModelModule,
  ModuleRegistry,
  type ColDef,
  type ColGroupDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const bgHeaderClass = "text-xs! border-r! border-border!";
const bgCellClass = "text-xs! border-r! border-border!";

export default function BaseTable() {
  const { t } = useTranslation();

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(
    () => [
      {
        field: "stock",
        headerName: "CK",
        width: 60, // giữ width cố định vì pinned
        minWidth: 55,
        maxWidth: 65,
        pinned: "left",
        suppressSizeToFit: true,
      },

      // Giá tham chiếu
      {
        field: "ceil",
        headerName: "Trần",
        minWidth: 46,
        flex: 0.7,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },
      {
        field: "ref",
        headerName: "TC",
        minWidth: 46,
        flex: 0.7,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },
      {
        field: "floor",
        headerName: "Sàn",
        minWidth: 46,
        flex: 0.7,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },

      // Bên mua
      {
        headerName: "Bên mua",
        headerClass: bgHeaderClass,
        marryChildren: true,
        children: [
          {
            field: "buyPrice3",
            headerName: "Giá 3",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "buyVol3",
            headerName: "KL 3",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "buyPrice2",
            headerName: "Giá 2",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "buyVol2",
            headerName: "KL 2",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "buyPrice1",
            headerName: "Giá 1",
            minWidth: 45,
            flex: 1.1,
          },
          {
            field: "buyVol1",
            headerName: "KL 1",
            minWidth: 45,
            flex: 1.1,
          },
        ],
      },

      // Khớp lệnh
      {
        headerName: "Khớp lệnh",
        headerClass: bgHeaderClass,
        marryChildren: true,
        children: [
          {
            field: "matchPrice",
            headerName: "Khớp",
            minWidth: 50,
            flex: 1.3,
            headerClass: bgHeaderClass,
            cellClass: bgCellClass,
          },
          {
            field: "matchVol",
            headerName: "KL",
            minWidth: 50,
            flex: 1.2,
            headerClass: bgHeaderClass,
            cellClass: bgCellClass,
          },
          {
            field: "change",
            headerName: "+/-",
            minWidth: 50,
            flex: 1,
            headerClass: bgHeaderClass,
            cellClass: bgCellClass,
          },
          {
            field: "changePct",
            headerName: "%",
            minWidth: 50,
            flex: 1.1,
            headerClass: bgHeaderClass,
            cellClass: bgCellClass,
          },
        ],
      },

      // Bên bán
      {
        headerName: "Bên bán",
        headerClass: bgHeaderClass,
        marryChildren: true,
        children: [
          {
            field: "sellPrice1",
            headerName: "Giá 1",
            minWidth: 45,
            flex: 1.1,
          },
          {
            field: "sellVol1",
            headerName: "KL 1",
            minWidth: 45,
            flex: 1.1,
          },
          {
            field: "sellPrice2",
            headerName: "Giá 2",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "sellVol2",
            headerName: "KL 2",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "sellPrice3",
            headerName: "Giá 3",
            minWidth: 45,
            flex: 1,
          },
          {
            field: "sellVol3",
            headerName: "KL 3",
            minWidth: 45,
            flex: 1,
          },
        ],
      },

      // Thông tin khác
      {
        field: "high",
        headerName: "Cao",
        minWidth: 46,
        flex: 0.7,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },
      {
        field: "low",
        headerName: "Thấp",
        minWidth: 46,
        flex: 0.7,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },
      {
        field: "totalVolume",
        headerName: "Tổng KL",
        minWidth: 57,
        flex: 1.2,
        headerClass: bgHeaderClass,
        cellClass: bgCellClass,
      },

      // Nhà đầu tư nước ngoài
      {
        headerName: "ĐTNN",
        headerClass: "text-xs text-center",
        marryChildren: true,
        children: [
          {
            field: "nnBuy",
            headerName: "Mua",
            minWidth: 55,
            flex: 1.1,
          },
          {
            field: "nnSell",
            headerName: "Bán",
            minWidth: 55,
            flex: 1.1,
          },
          {
            field: "nnRoom",
            headerName: "Room",
            minWidth: 55,
            flex: 1.3,
            headerClass: "text-xs",
            cellClass: "text-xs text-right",
          },
        ],
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: false,
      cellClass: "text-xs! font-normal! border-r! border-border!",
      headerClass: "text-xs! font-normal! border-r! border-border!",
    }),
    [],
  );

  const rowData: any[] = [];
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
