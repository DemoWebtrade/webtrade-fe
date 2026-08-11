import { AgGridReact } from "ag-grid-react";

export default function OrderHistory() {
  const rowData = [
    { make: "Tesla", model: "Model Y", price: 64950 },
    { make: "Ford", model: "F-Series", price: 33850 },
    { make: "Toyota", model: "Corolla", price: 29600 },
    { make: "Mercedes", model: "EQA", price: 48890 },
    { make: "Fiat", model: "500", price: 15774 },
    { make: "Nissan", model: "Juke", price: 20675 },
  ];

  const columnDefs = [
    {
      headerName: "Make & Model",
      valueGetter: (params: any) => `${params.data.make} ${params.data.model}`,
      flex: 2,
    },
    {
      field: "price",
      valueFormatter: (params: any) =>
        `£${Math.floor(params.value).toLocaleString()}`,
      flex: 1,
    },
  ];

  return (
    <div className="ag-theme-custom h-full w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: false,
          resizable: false,
        }}
        suppressMovableColumns={true}
        suppressCellFocus={true}
      />
    </div>
  );
}
