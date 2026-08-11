import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";

export default function OrderHistory() {
  const { t } = useTranslation();

  const columnDefs: any = [
    {
      headerName: "Make & Model",
      flex: 2,
    },
    {
      field: "price",
      flex: 1,
    },
  ];

  return (
    <div className="ag-theme-custom h-full w-full">
      <AgGridReact
        rowData={[]}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: false,
          resizable: false,
          headerClass: "text-xs! font-normal!",
          cellClass: "text-xs! font-normal! grid! place-items-center!",
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
